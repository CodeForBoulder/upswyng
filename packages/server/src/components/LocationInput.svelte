<script>
  import { Loader } from "@googlemaps/js-api-loader"
  import { onMount } from "svelte";

  export let resource = null;
  export let resourceForm = null;

  let inputValue = "";
  let mapShowing = true;

  onMount( async () => {
    mapShowing = await loadMap();
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

      inputValue = address;
    }
    if(geometry) {
      const latitude = geometry.location.lat();
      const longitude = geometry.location.lng();
      resource.latitude = latitude || 40.01;
      resource.longitude = longitude || -105.27;
    }
  }

  // See https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete for the source of this function
  async function loadMap() {
    try{
      const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
      const loader = new Loader({
        apiKey:  GOOGLE_MAPS_API_KEY,
        version: "weekly",
        libraries: ["places"],
      });
      await loader.load();

      const map = new google.maps.Map(document.getElementById("map"), {
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
        infowindowContent.children["place-name"].textContent = place.name;
        infowindowContent.children["place-address"].textContent = address;
        infowindow.open(map, marker);

      });

      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
</script>

<style>
  #map {
    width: '100%';
    height: 25rem;
    max-width: 40rem;
  }
</style>

<div class="columns">
  <div class="column">
    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label" for="address1">Address 1</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control has-icons-right">
            <input
              id="pac-input"
              class="input"
              class:is-danger={$resourceForm.address1.errors.length}
              autocomplete="chrome-off"
              type="text"
              placeholder="Address 1"
              bind:value={resource.address.address1} />
            {#if $resourceForm.address1.errors.length}
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle" />
              </span>
            {/if}
          </div>
          {#if $resourceForm.address1.errors.includes('required')}
            <p class="help is-danger">An address is required</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label" for="address2">Address 2</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control">
            <input
              class="input"
              autocomplete="address-line2"
              type="text"
              placeholder="Address 2"
              bind:value={resource.address.address2} />
          </div>
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label" for="city">City</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control has-icons-right">
            <input
              class="input"
              class:is-danger={$resourceForm.city.errors.length}
                     autocomplete="address-level2"
              type="text"
              placeholder="City"
              bind:value={resource.address.city} />
            {#if $resourceForm.city.errors.length}
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle" />
              </span>
            {/if}
          </div>
          {#if $resourceForm.city.errors.includes('required')}
            <p class="help is-danger">An address is required</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label" for="state">State</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control has-icons-right">
            <input
              class="input"
              class:is-danger={$resourceForm.state.errors.length}
                     autocomplete="address-level1"
              type="text"
              placeholder="State"
              bind:value={resource.address.state} />
            {#if $resourceForm.state.errors.length}
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle" />
              </span>
            {/if}
          </div>
          {#if $resourceForm.state.errors.includes('required')}
            <p class="help is-danger">A state is required</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="field is-horizontal">
      <div class="field-label is-small">
        <label class="label" for="zip">ZIP</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control has-icons-right">
            <input
              class="input"
              class:is-danger={$resourceForm.zip.errors.length}
                     autocomplete="postal-code"
              type="text"
              placeholder="ZIP"
              bind:value={resource.address.zip} />
            {#if $resourceForm.zip.errors.length}
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle" />
              </span>
            {/if}
          </div>
          {#if $resourceForm.zip.errors.includes('required')}
            <p class="help is-danger">A ZIP code is required</p>
          {/if}
        </div>
      </div>
    </div>
  </div>

  {#if mapShowing}
    <div class="column">
      <div id="map"></div>
      <div id="infowindow-content">
        <span id="place-name" class="title"></span><br />
        <span id="place-address"></span>
      </div>
    </div>
  {/if}
</div>
