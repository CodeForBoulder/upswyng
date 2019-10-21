<script>
  export let segment;
  export let user; // ?TUser

  let toggled = false;

  function burgerClick() {
    toggled = !toggled;
  }
</script>

<style>
  img {
    width: 2.5em;
  }
</style>

<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img alt="Upswyng: Resources within reach" src="upswyng_arrow.svg" />
    </a>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a
      role="button"
      class="navbar-burger burger"
      class:is-active={toggled}
      on:click={burgerClick}
      aria-label="menu"
      aria-expanded="false"
      data-target="upswyng-main-nav">
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </a>
  </div>
  <div id="upswyng-main-nav" class="navbar-menu" class:is-active={toggled}>
    <div class="navbar-start">
      <a class:has-text-weight-semibold={!segment} class="navbar-item" href="/">
        Home
      </a>
      <a
        class:has-text-weight-semibold={segment === 'resource'}
        class="navbar-item"
        href="resource">
        Resources
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="navbar-link">More</a>

        <div class="navbar-dropdown">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="navbar-item">About</a>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="navbar-item">Privacy</a>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="navbar-item">Contact</a>
          <hr class="navbar-divider" />
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="navbar-item">Report an issue</a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      {#if user && user.isAdmin}
        <div class="navbar-item">Admin</div>
      {/if}
      <div class="navbar-item">
        <div class="buttons">
          {#if !user}
            <a class="button is-primary" href="login">
              <strong>Log In</strong>
            </a>
          {:else}
            <a class="button" href="logout">
              <strong>Log Out</strong>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>
