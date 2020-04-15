<script>
  import { goto } from "@sapper/app";
  import ResourceSearch from "../components/ResourceSearch.svelte";
</script>

<style>
  .upswyng-intro {
    background-color: #414042;
  }
  img {
    display: block;
    width: 100%;
    margin-right: 6em;
  }

  .hero-container {
    display: flex;
    align-items: center;
  }

  .hero-image-container {
    flex: 3;
    margin-right: 3em;
  }

  .hero-container p {
    flex: 2;
  }

  .hero-tag {
    color: white;
    line-height: 1.25em;
  }

  .visit-web-app {
    display: block;
    margin: 0 auto;
  }
</style>

`
<svelte:head>
  <title>Upswyng</title>
</svelte:head>

<section class="hero">
  <div class="hero-body upswyng-intro">
    <div class="container hero-container">
      <div class="hero-image-container">
        <img alt="upswyng: Resources within reach" src="upswyng_light.svg" />
      </div>
      <p class="title hero-tag">
        Upswyng is helping people in Boulder access the resources they need.
      </p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <a
      href="https://upswyng.netlify.app"
      class="button is-primary visit-web-app">
      Visit the Web App
    </a>
  </div>
  <div class="container">
    <h2 class="subtitle">Search for a Resource, Just for Mike</h2>
    <ResourceSearch
      action="view"
      on:resourceClick={({ detail: resourceId }) => {
        goto(`/resource/${resourceId}`);
      }} />
  </div>
</section>
