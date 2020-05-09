<script>
  import { goto } from "@sapper/app";
  import ResourceSearch from "./../../components/ResourceSearch.svelte";
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
</style>

<svelte:head>
  <title>Upswyng: Provider Portal</title>
</svelte:head>

<section class="hero is-dark">
  <div class="hero-body upswyng-intro">
    <div class="container">
      <div class="columns is-variable is-6 is-vcentered">
        <div class="column">
          <img alt="upswyng: Resources within reach" src="upswyng_light.svg" />
        </div>
        <div class="column">
          <h1 class="title">Upswyng Provider Portal</h1>
          <p class="subtitle">
            Welcome to the Provider’s Portal. This is the place to update your
            organization’s information so it’s the latest and most accurate for
            the at-risk community.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="columns is-variable is-6">
      <div class="column content">
        <h2 class="is-size-4 has-text-weight-semibold">Find Your Listing</h2>
        <ResourceSearch
          action="view"
          on:select={({ detail: resourceId }) => {
            goto(`/provider/resource/${resourceId}`);
          }} />
        <p>
          We have made an easy and intuitive portal for you to make changes. All
          changes are subject to confirmation before going live. Just update and
          save as a draft and we will do the rest.
        </p>
        <a href="/provider/login" class="button is-primary">
          Login to Add Yours
        </a>
      </div>
      <div class="column">
        <aside class="message is-medium">
          <h2 class="message-header">Looking for the public app?</h2>
          <div class="columns is-multiline message-body">
            <p class="column is-full">
              See how the at-risk community can find your offerings.
            </p>
            <div class="column">
              <a href="/" class="button is-primary">Visit the Web App</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</section>
