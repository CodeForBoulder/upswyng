import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { TResource } from '../types';

const boulderCoordinates = {
  lat: 40.0156852,
  lng: -105.2792069
};

interface Props {
  resource: TResource;
}

const Map2 = ({ resource }: Props) => {
  const [googleMap, setGoogleMap] = useState<any | null>(null);
  const [googleMaps, setGoogleMaps] = useState<any | null>(null);
  const [directionsDisplay, setDirectionsDisplay] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);

  const handleGoogleMapApiLoaded = (googleMapObjects: {
    map: any;
    maps: any;
  }) => {
    const { map, maps } = googleMapObjects;
    setGoogleMap(map);
    setGoogleMaps(maps);
    setDirectionsDisplay(new maps.DirectionsDisplay());
    setDirectionsService(new maps.DirectionsService());
  };

  const { lat: resourceLat, lng: resourceLng } = resource;
  const resourceLatLng = {
    lat: resourceLat,
    lng: resourceLng
  };

  return (
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
  );
};
