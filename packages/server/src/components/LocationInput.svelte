<script>
  import { Loader } from "@googlemaps/js-api-loader"
  import { createEventDispatcher } from "svelte";
  import { getContext, onMount, onDestroy } from "svelte";
  // import * as dotenv from "dotenv";
  // import { config } from 'dotenv';
  // import replace from '@rollup/plugin-replace';

  let inputVal = "";

  // export let address1 = "";
  export let resource = null;
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  onMount(() => {
    const loader = new Loader({
      apiKey:  GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    });

    let map;
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.01, lng: -105.27 },
        zoom: 8,
      });

      const input = document.getElementById("pac-input");
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo("bounds", map);
      autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
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
            (place.address_components[2] &&
             place.address_components[2].short_name) ||
              "",
          ].join(" ");

          const asDict = place.address_components.reduce((accum, component) => {
            component.types.forEach(type => accum[type] = component.long_name);
            return accum;
          }, {});
          console.log({asDict});

          const city = asDict.locality || "";
          const zip = asDict.postal_code || "";
          const state = asDict.administrative_area_level_1 || "";

          resource.address.address1 = address;
          resource.address.city = city;
          resource.address.zip = zip;
          resource.address.state = state;

          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          resource.latitude = latitude || 40.01;
          resource.longitude = longitude || -105.27;
        }
        infowindowContent.children["place-icon"].src = place.icon;
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = address;
        infowindow.open(map, marker);

        console.log({address, place});
        console.log({resource});
      });


    }).catch(e => console.log(e));
  })


</script>

<style>
  #map {
    width: 500px;
    height: 500px;
  }
</style>

<div class="content">
  <input
    id="pac-input"
    class="input"
    class:is-danger={false}
    type="text"
    placeholder="Search"
    bind:value={inputVal} />
<div id="infowindow-content">
      <img src="" width="16" height="16" id="place-icon" />
      <span id="place-name" class="title"></span><br />
      <span id="place-address"></span>
    </div>
  <div id="map"></div>
</div>
