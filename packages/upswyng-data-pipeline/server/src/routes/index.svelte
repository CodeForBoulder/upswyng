<script context="module">
  export function preload(page, { user }) {
    return { user };
  }
</script>

<script>
  export let user;
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

<svelte:head>
  <title>Upswyng</title>
</svelte:head>

<section class="hero">
  <div class="hero-body upswyng-intro">
    <div class="container hero-container">
      <div class="hero-image-container">
        <img alt="Upswyng: Resource within reach" src="upswyng_light.svg" />
      </div>
      <p class="title hero-tag">
        Upswyng is helping people in Boulder access the resources they need.
      </p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <a href="https://upswyng.netlify.com" class="button is-primary visit-web-app">Visit the Web App</a>
  </div>
</section>
