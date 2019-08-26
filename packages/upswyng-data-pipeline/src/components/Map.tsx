import { TResource } from "../types";
import React from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import { View } from "react-native";
import { Resource } from "./Resource";
import { colors } from "../App.styles";
import { RegularText, BoldText } from "./UpText";

class Map extends React.Component<{ resource: TResource }> {
  render() {
    const {
      address1,
      address2,
      city,
      state,
      zip,
      lat: latitude,
      lng: longitude,
      charityname: name,
    } = this.props.resource;
    return (
      <View style={{ width: "100%", marginBottom: 24, borderRadius: 8 }}>
        <MapView
          scrollEnabled={false}
          style={{ borderRadius: 24, width: "100%", height: 360 }}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          loadingIndicatorColor={colors.orangePrimary}
          loadingEnabled={true}
          loadingBackgroundColor={colors.greyLight}>
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            description={`${address1}\n${
              address2 ? address2 + "\n" : ""
            }${city}, ${state}\n${zip}`}
            title={name}>
            <Callout>
              <View>
                <BoldText fontSize={12}>{name}</BoldText>
                <RegularText>{address1}</RegularText>
                {address2 && <RegularText>{address2}</RegularText>}
                <RegularText>
                  <>
                    {city}, {state}
                  </>
                </RegularText>
                <RegularText>{zip}</RegularText>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
    );
  }
}

export default Map;

// const boulderCoordinates = {
//     latitude: 40.0156852,
//     longitude: -105.2792069,
//   };

//   interface Props {
//     resource: TResource;
//   }

//   const MapOuterContainer = styled.div`
//     margin: ${font.helpers.convertPixelsToRems(16)} auto 0;
//     position: relative;
//     width: 100%;
//     &::before {
//       content: '';
//       display: block;
//       padding-bottom: 55%;
//       width: 100%;
//     }
//   `;

//   const MapInnerContainer = styled.div`
//     bottom: 0;
//     left: 0;
//     position: absolute;
//     right: 0;
//     top: 0;
//     & .google-map__info-window {
//       background: ${colors.white};
//       color: ${colors.black};
//       display: block;
//     }
//     & .google-map__charity-name {
//       font-weight: 700;
//     }
//     & .google-map__address-line {
//       display: block;
//     }
//   `;

//   const MapLoadingMask = styled.div`
//     align-items: center;
//     background: rgba(0, 0, 0, 0.75);
//     bottom: 0;
//     display: flex;
//     justify-content: center;
//     left: 0;
//     position: absolute;
//     right: 0;
//     top: 0;
//   `;

//   const Map = ({ resource }: Props) => {
//     const [googleMap, setGoogleMap] = useState<any | null>(null);
//     const [googleMaps, setGoogleMaps] = useState<any | null>(null);
//     const [fetchGoogleMapsStatus, setFetchGoogleMapsStatus] = useState<
//       TStatusFetch
//     >(TStatusFetch.STATUS_FETCHING);
//     const [directionsRenderer, setDirectionsRenderer] = useState<any | null>(
//       null
//     );
//     const [directionsService, setDirectionsService] = useState<any | null>(null);
//     const [fetchDirectionsStatus, setFetchDirectionsStatus] = useState<
//       TStatusFetch
//     >(TStatusFetch.STATUS_NOT_FETCHED);
//     const [areDirectionsShown, setAreDirectionsShown] = useState(false);

//     const addMapMarker = () => {
//       const {
//         charityname,
//         lat,
//         lng,
//         address1,
//         address2,
//         city,
//         state,
//         zip
//       } = resource;

//       const resourceMarker = new googleMaps.Marker({
//         map: googleMap,
//         title: charityname,
//         position: {
//           lat,
//           lng
//         }
//       });

//       const resourceMarkerInfoWindow = new googleMaps.InfoWindow({
//         content: `
//             <div class="google-map__info-window">
//               <span class="google-map__charity-name">${charityname}</span>
//               <span class="google-map__address-line">${address1}</span>
//               <span class="google-map__address-line">${address2 || ''}</span>
//               <span class="google-map__address-line">${city}, ${state} ${zip}</span>
//             </div>
//           `
//       });

//       resourceMarker.addListener('mouseover', () => {
//         resourceMarkerInfoWindow.open(googleMap, resourceMarker);
//       });
//       resourceMarker.addListener('focus', () => {
//         resourceMarkerInfoWindow.open(googleMap, resourceMarker);
//       });
//       resourceMarker.addListener('mouseout', () => {
//         resourceMarkerInfoWindow.close();
//       });
//       resourceMarker.addListener('blur', () => {
//         resourceMarkerInfoWindow.close();
//       });
//     };

//     const getUserPosition = (): Promise<Position> =>
//       new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(
//           pos => {
//             resolve(pos);
//           },
//           err => {
//             reject(err);
//           }
//         );
//       });

//     const hideDirections = () => {
//       directionsRenderer.setMap(null);
//       setAreDirectionsShown(false);
//     };

//     const fetchDirections = (userPosition: Position): Promise<boolean> =>
//       new Promise((resolve, reject) => {
//         directionsRenderer.setMap(googleMap);

//         const userLatLng = new googleMaps.LatLng(
//           userPosition.coords.latitude,
//           userPosition.coords.longitude
//         );

//         // remove default markers A and B (origin/destination)
//         directionsRenderer.setOptions({ suppressMarkers: true });

//         try {
//           directionsService.route(
//             {
//               origin: userLatLng,
//               destination: {
//                 lat: resource.lat,
//                 lng: resource.lng
//               },
//               // TODO: allow updating the travel mode
//               travelMode: 'TRANSIT'
//             },
//             (response: any, status: string) => {
//               console.log(response);
//               if (status === 'OK') {
//                 directionsRenderer.setDirections(response);
//                 resolve(true);
//               } else {
//                 setFetchDirectionsStatus(TStatusFetch.STATUS_FETCH_ERROR);
//                 reject(status);
//               }
//             }
//           );
//         } catch (err) {
//           setFetchDirectionsStatus(TStatusFetch.STATUS_FETCH_ERROR);
//           reject(err);
//         }
//       });

//     const placeDirections = (): Promise<boolean> =>
//       new Promise(async (resolve, reject) => {
//         try {
//           setFetchDirectionsStatus(TStatusFetch.STATUS_FETCHING);
//           const userPosition = await getUserPosition();
//           await fetchDirections(userPosition);
//           setFetchDirectionsStatus(TStatusFetch.STATUS_FETCH_SUCCESS);
//           resolve(true);
//         } catch (err) {
//           setFetchDirectionsStatus(TStatusFetch.STATUS_FETCH_ERROR);
//           reject(err);
//         }
//       });

//     const handleGoogleMapApiLoaded = (googleMapObjects: {
//       map: any;
//       maps: any;
//     }) => {
//       const { map, maps } = googleMapObjects;
//       setGoogleMap(map);
//       setGoogleMaps(maps);
//       setDirectionsRenderer(new maps.DirectionsRenderer());
//       setDirectionsService(new maps.DirectionsService());
//       setFetchGoogleMapsStatus(TStatusFetch.STATUS_FETCH_SUCCESS);
//     };

//     const handleShowDirectionsChange = async () => {
//       if (!areDirectionsShown) {
//         switch (fetchDirectionsStatus) {
//           case TStatusFetch.STATUS_FETCHING:
//             break;
//           case TStatusFetch.STATUS_FETCH_SUCCESS:
//           case TStatusFetch.STATUS_FETCH_ERROR:
//           case TStatusFetch.STATUS_NOT_FETCHED:
//           default:
//             try {
//               await placeDirections();
//               setAreDirectionsShown(true);
//             } catch (err) {
//               console.log(err);
//             }
//         }
//       } else {
//         hideDirections();
//       }
//     };

//     const { lat: resourceLat, lng: resourceLng } = resource;
//     const resourceLatLng = {
//       lat: resourceLat,
//       lng: resourceLng
//     };

//     useEffect(() => {
//       if (googleMaps) {
//         addMapMarker();
//       }
//     }, [googleMaps]);

//     const MapLoadingElements = () => {
//       if (
//         fetchGoogleMapsStatus === TStatusFetch.STATUS_FETCHING ||
//         fetchDirectionsStatus === TStatusFetch.STATUS_FETCHING
//       ) {
//         return (
//           <MapLoadingMask>
//             <LoadingSpinner />
//           </MapLoadingMask>
//         );
//       }
//       return null;
//     };

//     return (
//       <>
//         <MapOuterContainer>
//           <MapInnerContainer>
//             <GoogleMapReact
//               bootstrapURLKeys={{
//                 key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
//               }}
//               defaultCenter={boulderCoordinates}
//               defaultZoom={13}
//               center={resourceLatLng}
//               yesIWantToUseGoogleMapApiInternals={true}
//               onGoogleApiLoaded={handleGoogleMapApiLoaded}
//             />
//           </MapInnerContainer>
//           <MapLoadingElements />
//         </MapOuterContainer>
//         <CheckboxInput
//           checked={areDirectionsShown}
//           onChange={handleShowDirectionsChange}
//           disabled={fetchDirectionsStatus === TStatusFetch.STATUS_FETCHING}
//           value="directionsVisible"
//           label="show directions"
//         />
//       </>
//     );
//   };
