import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { TResource, TStatusFetch } from '../types';
import { colors } from '../App.styles';
import CheckboxInput from './CheckboxInput';
import LoadingSpinner from './LoadingSpinner';

const boulderCoordinates = {
  lat: 40.0156852,
  lng: -105.2792069
};

interface Props {
  resource: TResource;
}

const MapOuterContainer = styled.div`
  position: relative;
  width: 100%;
  &::before {
    content: '';
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
  opacity: 0.75;
  position: absolute;
  right: 0;
  top: 0;
`;

const Map = ({ resource }: Props) => {
  const [googleMap, setGoogleMap] = useState<any | null>(null);
  const [googleMaps, setGoogleMaps] = useState<any | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<any | null>(
    null
  );
  const [directionsService, setDirectionsService] = useState<any | null>(null);
  const [fetchDirectionsStatus, setFetchDirectionsStatus] = useState<
    TStatusFetch
  >(TStatusFetch.STATUS_NOT_FETCHED);
  const [areDirectionsShown, setAreDirectionsShown] = useState(false);

  const addMapMarker = () => {
    const {
      charityname,
      lat,
      lng,
      address1,
      address2,
      city,
      state,
      zip
    } = resource;

    const resourceMarker = new googleMaps.Marker({
      map: googleMap,
      title: charityname,
      position: {
        lat,
        lng
      }
    });

    const resourceMarkerInfoWindow = new googleMaps.InfoWindow({
      content: `
          <div class="google-map__info-window">
            <span class="google-map__charity-name">${charityname}</span>
            <span class="google-map__address-line">${address1}</span>
            <span class="google-map__address-line">${address2 || ''}</span>
            <span class="google-map__address-line">${city}, ${state} ${zip}</span>
          </div>
        `
    });

    resourceMarker.addListener('mouseover', () => {
      resourceMarkerInfoWindow.open(googleMap, resourceMarker);
    });
    resourceMarker.addListener('focus', () => {
      resourceMarkerInfoWindow.open(googleMap, resourceMarker);
    });
    resourceMarker.addListener('mouseout', () => {
      resourceMarkerInfoWindow.close();
    });
    resourceMarker.addListener('blur', () => {
      resourceMarkerInfoWindow.close();
    });
  };

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
    directionsRenderer.setMap(null);
    setAreDirectionsShown(false);
  };

  const fetchDirections = (userPosition: Position): Promise<boolean> =>
    new Promise((resolve, reject) => {
      directionsRenderer.setMap(googleMap);

      const userLatLng = new googleMaps.LatLng(
        userPosition.coords.latitude,
        userPosition.coords.longitude
      );

      // remove default markers A and B (origin/destination)
      directionsRenderer.setOptions({ suppressMarkers: true });

      directionsService.route(
        {
          origin: userLatLng,
          destination: {
            lat: resource.lat,
            lng: resource.lng
          },
          travelMode: 'DRIVING'
        },
        (response: any, status: string) => {
          if (status === 'OK') {
            directionsRenderer.setDirections(response);
            resolve(true);
          } else {
            setFetchDirectionsStatus(TStatusFetch.STATUS_FETCH_ERROR);
            reject('whoopsies could not place directions');
          }
        }
      );
    });

  const placeDirections = (): Promise<boolean> =>
    new Promise(async (resolve, reject) => {
      try {
        setFetchDirectionsStatus(TStatusFetch.STATUS_FETCHING);
        const userPosition = await getUserPosition();
        await fetchDirections(userPosition);
        setFetchDirectionsStatus(TStatusFetch.STATUS_FETCH_SUCCESS);
        resolve();
      } catch (e) {
        setFetchDirectionsStatus(TStatusFetch.STATUS_FETCH_ERROR);
        console.log('there was some kind of problem idk');
        reject();
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
  };

  const handleShowDirectionsChange = async () => {
    if (!areDirectionsShown) {
      switch (fetchDirectionsStatus) {
        case TStatusFetch.STATUS_FETCHING:
          break;
        case TStatusFetch.STATUS_FETCH_SUCCESS:
        case TStatusFetch.STATUS_FETCH_ERROR:
        case TStatusFetch.STATUS_NOT_FETCHED:
        default:
          await placeDirections();
          setAreDirectionsShown(true);
      }
    } else {
      hideDirections();
    }
  };

  const { lat: resourceLat, lng: resourceLng } = resource;
  const resourceLatLng = {
    lat: resourceLat,
    lng: resourceLng
  };

  useEffect(() => {
    if (googleMaps) {
      addMapMarker();
    }
  }, [googleMaps]);

  const MapLoadingElements = () => {
    if (fetchDirectionsStatus === TStatusFetch.STATUS_FETCHING) {
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
      <MapOuterContainer>
        <MapInnerContainer>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
            }}
            defaultCenter={boulderCoordinates}
            defaultZoom={13}
            center={resourceLatLng}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={handleGoogleMapApiLoaded}
          />
        </MapInnerContainer>
        <MapLoadingElements />
      </MapOuterContainer>
      <CheckboxInput
        checked={areDirectionsShown}
        onChange={handleShowDirectionsChange}
        disabled={fetchDirectionsStatus === TStatusFetch.STATUS_FETCHING}
        value="directionsVisible"
        label="show directions"
      />
    </>
  );
};

export default Map;
