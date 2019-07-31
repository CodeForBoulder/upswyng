import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { TResource } from '../types';

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

  const addMapMarker = ({ charityname, lat, lng }: TResource) => {
    if (googleMaps) {
      new googleMaps.Marker({
        map: googleMap,
        title: charityname,
        position: {
          lat,
          lng
        }
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
