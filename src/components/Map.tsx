import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const boulderCoordinates = {
  lat: 40.0156852,
  lng: -105.2792069
};

class Map extends Component {
  constructor(props: any) {
    super(props);
  }

  initMap = (map: any, maps: any) => {
    // if Map component is passed resources, make Markers for each one
    // if Map component is passed a specificResource, make ONE marker with toggle-able directions
  };

  render() {
    return (
      <div style={{ height: '60vh', width: '100%' }}>
        <h1>Map</h1>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDlOtzxXw34ptAEGu8v8o8UTkwUJ0IG8zU' }}
          defaultCenter={boulderCoordinates}
          defaultZoom={13}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.initMap(map, maps)}
        />
      </div>
    );
  }
}

export default Map;
