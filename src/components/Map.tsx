import React, { Component } from 'react';
import styled from 'styled-components';
import GoogleMapReact from 'google-map-react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

import { font } from '../App.styles';
import { TResource } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  resources: TResource[];
}

interface State {
  maps: any;
  map: any;
  userPosition: Position | null;
  directionsDisplay: any;
  directionsService: any;
  directionsAreToggled: boolean;
}

const boulderCoordinates = {
  lat: 40.0156852,
  lng: -105.2792069
};

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

// TODO #58: Provide type params and fix type errors
class Map extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      directionsAreToggled: false,
      userPosition: null
    };
  }

  getUsersPosition = () =>
    navigator.geolocation.getCurrentPosition(pos =>
      this.setState({
        userPosition: pos
      })
    );

  calculateAndDisplayRoute = (
    directionsService: any,
    directionsDisplay: any,
    resourceAsDestination: any
  ) => {
    const userPosition = this.state.userPosition;
    if (userPosition) {
      const userLatLng = new this.state.maps.LatLng(
        userPosition.coords.latitude,
        userPosition.coords.longitude
      );

      // remove default markers A and B (origin/destination)
      directionsDisplay.setOptions({ suppressMarkers: true });

      directionsService.route(
        {
          origin: userLatLng,
          destination: {
            lat: resourceAsDestination.lat,
            lng: resourceAsDestination.lng
          },
          travelMode: 'DRIVING'
        },
        function(response: any, status: any) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            console.log(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  };

  toggleDirections = () => {
    const {
      map,
      directionsDisplay,
      directionsService,
      directionsAreToggled,
      userPosition
    } = this.state;

    if (!userPosition) {
      this.getUsersPosition();
      return;
    }

    if (!directionsAreToggled) {
      directionsDisplay.setMap(map);

      this.calculateAndDisplayRoute(
        directionsService,
        directionsDisplay,
        this.props.resources[0]
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
          resource.servicetype +
          '</div>'
        // TODO: Include if its open/hours (unsure of how resource.hours will be formatted)
        // TODO: Use a custom component instead of an infoWindow
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

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { userPosition: prevPosition } = prevState;
    const { userPosition: currentPosition } = this.state;

    if (currentPosition !== prevPosition) {
      this.toggleDirections();
    }
  }

  render() {
    const firstResource = this.props.resources[0];
    const { lat, lng } = firstResource;
    const centerOnFirstResource = {
      lat: lat,
      lng: lng
    };

    return (
      <>
        <MapOuterContainer>
          <MapInnerContainer>
            {!this.state.maps && <LoadingSpinner />}
            <GoogleMapReact
              bootstrapURLKeys={{
                key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
              }}
              defaultCenter={boulderCoordinates}
              defaultZoom={13}
              center={centerOnFirstResource}
              yesIWantToUseGoogleMapApiInternals={true}
              onGoogleApiLoaded={({ map, maps }) => this.initMap(map, maps)}
            />
          </MapInnerContainer>
        </MapOuterContainer>
        <FormControlLabel
          control={
            <Checkbox
              onChange={this.toggleDirections}
              value={'directionsVisible'}
            />
          }
          label="show directions"
        />
      </>
    );
  }
}

export default Map;
