import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import withResource from './withResource';
import { TResource } from '../types';

type Props = { data: TResource };

const boulderCoordinates = {
  lat: 40.0156852,
  lng: -105.2792069
};

class Map extends Component<any, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      directionsAreToggled: false
    };
  }

  calculateAndDisplayRoute = (
    directionsService: any,
    directionsDisplay: any,
    resourceAsDestination: any
  ) => {
    const userLocation = this.props.currentUser.location;

    // remove default markers A and B (origin/destination)
    directionsDisplay.setOptions({ suppressMarkers: true });

    directionsService.route(
      {
        origin: userLocation,
        destination: {
          lat: resourceAsDestination.lat,
          lng: resourceAsDestination.lng
        },
        travelMode: 'TRANSIT'
      },
      function(response: any, status: any) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      }
    );
  };

  toggleDirections = (resource: any) => {
    const {
      map,
      directionsDisplay,
      directionsService,
      directionsAreToggled
    } = this.state;

    if (!directionsAreToggled) {
      directionsDisplay.setMap(map);

      this.calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        resource
      );
    } else {
      directionsDisplay.setMap(null);
    }

    this.setState({ directionsAreToggled: !directionsAreToggled });
  };

  createMarkers = (map: any, maps: any) => {
    const resources = this.props.resources;
    resources.forEach((resource: any) => {
      let marker = new maps.Marker({
        map: map,
        title: resource.name,
        position: {
          lat: resource.lat,
          lng: resource.lng
        }
      });

      let infoWindow = new maps.InfoWindow({
        content:
          '<div><b>' +
          resource.name +
          '</b><br>' +
          resource.category +
          '<br>' +
          resource.address +
          '<br><br>' +
          '<b>For</b>: ' +
          resource.audience +
          '<br>' +
          '<b>Offers</b>: ' +
          resource.services.join(', ') +
          '</div>'
        // will need to include if its open/hours (unsure of how resource.hours will be formatted)
      });

      marker.addListener('mouseover', function() {
        infoWindow.open(map, marker);
      });

      marker.addListener('focus', function() {
        infoWindow.open(map, marker);
      });

      marker.addListener('mouseout', function() {
        infoWindow.close();
      });

      marker.addListener('blur', function() {
        infoWindow.close();
      });
    });
  };

  initMap = (map: any, maps: any) => {
    let directionsService = new maps.DirectionsService();
    let directionsDisplay = new maps.DirectionsRenderer();
    this.setState({
      map: map,
      maps: maps,
      directionsService: directionsService,
      directionsDisplay: directionsDisplay
    });

    this.createMarkers(map, maps);
  };

  render() {
    const firstResource = this.props.resources[0];
    const { name, lat, lng } = firstResource;
    const centerOnFirstResource = {
      lat: lat,
      lng: lng
    };

    return (
      // Map must have height/width defined - but manipulate as necessary
      <div style={{ height: '60vh', width: '100%' }}>
        <h2>Map</h2>
        <button onClick={() => this.toggleDirections(firstResource)}>
          Show/Hide Directions to {name}
        </button>
        <GoogleMapReact
          bootstrapURLKeys={{ key: '<API_KEY>' }}
          defaultCenter={boulderCoordinates}
          defaultZoom={13}
          center={centerOnFirstResource}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => this.initMap(map, maps)}
        />
      </div>
    );
  }
}

export default Map;
