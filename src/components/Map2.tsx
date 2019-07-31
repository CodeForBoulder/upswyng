import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { TResource } from '../types';
import { colors } from '../App.styles';

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

const Map2 = ({ resource }: Props) => {
  const [googleMap, setGoogleMap] = useState<any | null>(null);
  const [googleMaps, setGoogleMaps] = useState<any | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

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

  const addMapMarker = ({
    charityname,
    lat,
    lng,
    address1,
    address2,
    city,
    state,
    zip
  }: TResource) => {
    if (googleMaps) {
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
    }
  };

  const { lat: resourceLat, lng: resourceLng } = resource;
  const resourceLatLng = {
    lat: resourceLat,
    lng: resourceLng
  };

  useEffect(() => {
    addMapMarker(resource);
  }, [googleMap, googleMaps]);

  return (
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
    </MapOuterContainer>
  );
};

export default Map2;
