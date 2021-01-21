<script>
  import { Loader } from "@googlemaps/js-api-loader"
  import { createEventDispatcher } from "svelte";
  import { getContext, onMount, onDestroy } from "svelte";

  export let resource = null;

  let inputVal = "";
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  onMount( async () => {
    await loadMap();
  })

// The custom application code that's run when a user selects a search result
function onPlaceChanged({address, geometry, addressComponents}) {
  if(addressComponents) {
    const asDict = addressComponents.reduce((accum, component) => {
      component.types.forEach(type => accum[type] = component.long_name);
      return accum;
    }, {});

    const city = asDict.locality || "";
    const zip = asDict.postal_code || "";
    const state = asDict.administrative_area_level_1 || "";
    resource.address.address1 = address;
    resource.address.city = city;
    resource.address.zip = zip;
    resource.address.state = state;
  }
  if(geometry) {
    const latitude = geometry.location.lat();
    const longitude = geometry.location.lng();
    resource.latitude = latitude || 40.01;
    resource.longitude = longitude || -105.27;
  }

}

async function loadMap() {
  try{
    // See https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete for the source of this code
    const loader = new Loader({
      apiKey:  GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });
    await loader.load();

    let map;
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 40.01, lng: -105.27 },
      zoom: 9,
      // Don't need all of the map control UI elements showing
      disableDefaultUI: true,
      zoomControl: true,
    });

    const input = document.getElementById("pac-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo("bounds", map);
    autocomplete.setFields(["address_components", "geometry", "icon", "name", "place_id"]);
    const infowindow = new google.maps.InfoWindow();
    const infowindowContent = document.getElementById("infowindow-content");
    infowindow.setContent(infowindowContent);
    const marker = new google.maps.Marker({
      map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener("place_changed", () => {
      infowindow.close();
      marker.setVisible(false);
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17); // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      let address = "";

      if (place.address_components) {
        address = [
          (place.address_components[0] &&
            place.address_components[0].short_name) ||
            "",
          (place.address_components[1] &&
            place.address_components[1].short_name) ||
            "",
        ].join(" ");

        onPlaceChanged({address, geometry: place.geometry, addressComponents: place.address_components});
      }
      infowindowContent.children["place-icon"].src = place.icon;
      infowindowContent.children["place-name"].textContent = place.name;
      infowindowContent.children["place-address"].textContent = address;
      infowindow.open(map, marker);
    });
  } catch(e) {
    console.log(e);
  }
}


</script>

<style>
  #map {
    width: '100%';
    height: 400px;
  }
</style>

<div class="content">
  <input
    id="pac-input"
    class="input"
    class:is-danger={false}
    type="text"
    placeholder="Search for provider name or address..."
    bind:value={inputVal} />
<div id="infowindow-content">
      <img src="" width="16" height="16" id="place-icon" />
      <span id="place-name" class="title"></span><br />
      <span id="place-address"></span>
    </div>
  <div id="map"></div>
</div>
