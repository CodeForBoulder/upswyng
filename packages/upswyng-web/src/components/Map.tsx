import { BikeIcon, BusIcon, CarIcon, CloseIcon, WalkIcon } from "./Icons";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  TGoogleMapDirectionsStatusCode,
  TGoogleMapTravelMode,
} from "../webTypes";
import { colors, font } from "../App.styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Divider from "@material-ui/core/Divider";
import GoogleMapReact from "google-map-react";
import Grid from "@material-ui/core/Grid";
import LoadingSpinner from "./LoadingSpinner";
import Snackbar from "@material-ui/core/Snackbar";
import { TResource } from "@upswyng/upswyng-types";
import styled from "styled-components";

const boulderCoordinates = {
  lat: 40.0156852,
  lng: -105.2792069,
};

// TODO: Only pass down the props that are needed
interface Props {
  address: TResource["address"];
  name: TResource["name"];
  latitude: NonNullable<TResource["latitude"]>;
  longitude: NonNullable<TResource["longitude"]>;
}

const MapOuterContainer = styled.div`
  margin: auto 0;
  position: relative;
  width: 100%;
  &::before {
    content: "";
    display: block;
    padding-bottom: 55%;
    width: 100%;
  }
`;

const MapInnerContainer = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  & .google-map__info-window {
    background: ${colors.white};
    color: ${colors.black};
    display: block;
  }
  & .google-map__charity-name {
    font-weight: 700;
  }
  & .google-map__address-line {
    display: block;
  }
`;

const MapLoadingMask = styled.div`
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;

const StyledSnackbar = styled(Snackbar)`
  && .MuiSnackbarContent-root {
    align-items: center;
    display: inline-flex;
    flex-wrap: nowrap;
  }
` as typeof Snackbar;

const SnackbarCloseButton = styled(IconButton)`
  && {
    color: ${colors.white};
  }
` as typeof IconButton;

const Map = ({ address, name, latitude, longitude }: Props) => {
  const [googleMap, setGoogleMap] = useState<any | null>(null);
  const [googleMaps, setGoogleMaps] = useState<any | null>(null);
  const [isFetchingGoogleMaps, setIsFetchingGoogleMaps] = useState<boolean>(
    false
  );
  const [directionsRenderer, setDirectionsRenderer] = useState<any | null>(
    null
  );
  const [directionsService, setDirectionsService] = useState<any | null>(null);
  const [isFetchingDirections, setIsFetchingDirections] = useState<boolean>(
    false
  );
  const [travelMode, setTravelMode] = useState<TGoogleMapTravelMode | null>(
    null
  );
  const [directionsError, setDirectionsError] = useState<string | null>(null);

  const addMapMarker = useCallback(() => {
    const { address1, address2, city, state, zip } = address;

    const resourceMarker = new googleMaps.Marker({
      map: googleMap,
      title: name,
      position: {
        lat: latitude,
        lng: longitude,
      },
    });

    const resourceMarkerInfoWindow = new googleMaps.InfoWindow({
      content: `
          <div class="google-map__info-window">
            <span class="google-map__charity-name">${name}</span>
            <span class="google-map__address-line">${address1}</span>
            <span class="google-map__address-line">${address2 || ""}</span>
            <span class="google-map__address-line">${city}, ${state} ${zip}</span>
          </div>
        `,
    });

    resourceMarker.addListener("mouseover", () => {
      resourceMarkerInfoWindow.open(googleMap, resourceMarker);
    });
    resourceMarker.addListener("focus", () => {
      resourceMarkerInfoWindow.open(googleMap, resourceMarker);
    });
    resourceMarker.addListener("mouseout", () => {
      resourceMarkerInfoWindow.close();
    });
    resourceMarker.addListener("blur", () => {
      resourceMarkerInfoWindow.close();
    });
  }, [address, googleMap, googleMaps, latitude, longitude, name]);

  useEffect(() => {
    if (googleMaps) {
      addMapMarker();
    }
  }, [addMapMarker, googleMaps]);

  const getUserPosition = (): Promise<Position> =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        pos => {
          resolve(pos);
        },
        err => {
          reject(err);
        }
      );
    });

  const hideDirections = () => {
    if (!directionsRenderer) {
      return;
    }
    setTravelMode(null);
    directionsRenderer.setMap(null);
  };

  const handleDirectionsError = (status: TGoogleMapDirectionsStatusCode) => {
    setIsFetchingDirections(false);
    switch (status) {
      case "ZERO_RESULTS":
        const directionTypeText: string = travelMode
          ? ` by ${travelMode.toLowerCase()}`
          : "";
        setDirectionsError(
          `It looks like we couldn't get directions${directionTypeText}. Please try a different type of travel.`
        );
        break;
      default:
        setDirectionsError(
          "We're sorry, there was a problem getting directions. Please try again later."
        );
    }
  };

  const handleErrorSnackbarClose = () => setDirectionsError(null);

  const fetchDirections = (userPosition: Position): Promise<boolean> =>
    new Promise((resolve, reject) => {
      directionsRenderer.setMap(googleMap);

      const userLatLng = new googleMaps.LatLng(
        userPosition.coords.latitude,
        userPosition.coords.longitude
      );

      // remove default markers A and B (origin/destination)
      directionsRenderer.setOptions({ suppressMarkers: true });

      try {
        directionsService.route(
          {
            avoidTolls: true,
            origin: userLatLng,
            destination: {
              lat: latitude,
              lng: longitude,
            },
            travelMode,
          },
          (response: any, status: TGoogleMapDirectionsStatusCode) => {
            if (status === "OK") {
              directionsRenderer.setDirections(response);
              resolve(true);
            } else {
              handleDirectionsError(status);
              reject(status);
            }
          }
        );
      } catch (err) {
        handleDirectionsError("UNKNOWN_ERROR");
        reject(err);
      }
    });

  const placeDirections = (): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
      try {
        setIsFetchingDirections(true);
        const userPosition = await getUserPosition();
        await fetchDirections(userPosition);
        setIsFetchingDirections(false);
        resolve(true);
      } catch (err) {
        setIsFetchingDirections(false);
        hideDirections();
        reject(err);
      }
    });

  const handleGoogleMapApiLoaded = (googleMapObjects: {
    map: any;
    maps: any;
  }) => {
    const { map, maps } = googleMapObjects;
    setGoogleMap(map);
    setGoogleMaps(maps);
    setDirectionsRenderer(new maps.DirectionsRenderer());
    setDirectionsService(new maps.DirectionsService());
    setIsFetchingGoogleMaps(false);
  };

  const handleShowDirectionsChange = async () => {
    if (isFetchingDirections) {
      return;
    }
    try {
      await placeDirections();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDirectionButtonClick = (newTravelMode: TGoogleMapTravelMode) =>
    setTravelMode(prevTravelMode =>
      newTravelMode !== prevTravelMode ? newTravelMode : null
    );

  useEffect(() => {
    if (travelMode) {
      handleShowDirectionsChange();
    } else {
      hideDirections();
    }
  }, [travelMode]);

  const MapLoadingElements = () => {
    if (isFetchingGoogleMaps || isFetchingDirections) {
      return (
        <MapLoadingMask>
          <LoadingSpinner />
        </MapLoadingMask>
      );
    }
    return null;
  };

  return (
    <>
      <Grid container justify="space-between" wrap="nowrap">
        <Grid container item justify="center">
          <IconButton
            onClick={() => handleDirectionButtonClick("TRANSIT")}
            color={travelMode === "TRANSIT" ? "primary" : "default"}
          >
            {BusIcon}
          </IconButton>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid container item justify="center">
          <IconButton
            onClick={() => handleDirectionButtonClick("BICYCLING")}
            color={travelMode === "TRANSIT" ? "primary" : "default"}
          >
            {BikeIcon}
          </IconButton>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid container item justify="center">
          <IconButton
            onClick={() => handleDirectionButtonClick("DRIVING")}
            color={travelMode === "TRANSIT" ? "primary" : "default"}
          >
            {CarIcon}
          </IconButton>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid container item justify="center">
          <IconButton
            onClick={() => handleDirectionButtonClick("WALKING")}
            color={travelMode === "TRANSIT" ? "primary" : "default"}
          >
            {WalkIcon}
          </IconButton>
        </Grid>
      </Grid>
      <MapOuterContainer>
        <MapInnerContainer>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
            }}
            defaultCenter={boulderCoordinates}
            defaultZoom={13}
            center={{ lat: latitude, lng: longitude }}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={handleGoogleMapApiLoaded}
          />
        </MapInnerContainer>
        <MapLoadingElements />
      </MapOuterContainer>
      <StyledSnackbar
        autoHideDuration={10000}
        message={directionsError}
        onClose={() => setDirectionsError(null)}
        open={!!directionsError}
        action={[
          <SnackbarCloseButton
            key="close"
            aria-label="close"
            onClick={handleErrorSnackbarClose}
          >
            {CloseIcon}
          </SnackbarCloseButton>,
        ]}
      />
    </>
  );
};

export default Map;
