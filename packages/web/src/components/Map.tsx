import { BikeIcon, BusIcon, CarIcon, WalkIcon } from "./Icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  TGoogleMapDirectionsStatusCode,
  TGoogleMapTravelMode,
} from "../webTypes";

import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import GoogleMapReact from "google-map-react";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import LoadingSpinner from "./LoadingSpinner";
import Snackbar from "@material-ui/core/Snackbar";
import { TResource } from "@upswyng/types";
import { colors } from "@upswyng/common";
import makeStyles from "@material-ui/core/styles/makeStyles";

const boulderCoordinates = {
  lat: 40.0156852,
  lng: -105.2792069,
};

const useStyles = makeStyles(theme => ({
  mapOuterContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    position: "relative",
    width: "100%",
    "&::before": {
      content: '""',
      display: "block",
      paddingBottom: "55%",
      width: "100%",
    },
  },
  mapInnerContainer: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    "& .google-map__info-window": {
      background: colors.white,
      color: colors.black,
      display: "block",
    },
    "& .google-map__charity-name": {
      fontWeight: 700,
    },
    "& .google-map__address-line": {
      display: "block",
    },
  },
  mapLoadingMask: {
    alignItems: "center",
    background: "rgba(0, 0, 0, 0.75)",
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
}));

// TODO: Only pass down the props that are needed
interface Props {
  address: TResource["address"];
  name: TResource["name"];
  latitude: NonNullable<TResource["latitude"]>;
  longitude: NonNullable<TResource["longitude"]>;
}

const Map = ({ address, name, latitude, longitude }: Props) => {
  const classes = useStyles();
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
    // TODO (@jacobvenable): if this eslint-disable is removed, the rule
    // react-hooks/exhaustive-deps warns. Our CI setup treats the warnings
    // as a failure.
    // eslint-disable-next-line
  }, [travelMode]);

  const MapLoadingElements = () => {
    if (isFetchingGoogleMaps || isFetchingDirections) {
      return (
        <div className={classes.mapLoadingMask}>
          <LoadingSpinner />
        </div>
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
            color={travelMode === "BICYCLING" ? "primary" : "default"}
          >
            {BikeIcon}
          </IconButton>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid container item justify="center">
          <IconButton
            onClick={() => handleDirectionButtonClick("DRIVING")}
            color={travelMode === "DRIVING" ? "primary" : "default"}
          >
            {CarIcon}
          </IconButton>
        </Grid>
        <Divider flexItem orientation="vertical" />
        <Grid container item justify="center">
          <IconButton
            onClick={() => handleDirectionButtonClick("WALKING")}
            color={travelMode === "WALKING" ? "primary" : "default"}
          >
            {WalkIcon}
          </IconButton>
        </Grid>
      </Grid>
      <div className={classes.mapOuterContainer}>
        <div className={classes.mapInnerContainer}>
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
        </div>
        <MapLoadingElements />
      </div>
      <Snackbar
        autoHideDuration={10000}
        onClose={() => setDirectionsError(null)}
        open={!!directionsError}
      >
        <Alert onClose={handleErrorSnackbarClose} severity="error">
          {directionsError}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Map;
