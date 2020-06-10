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
  <div class="container">
    <div class="navbar-brand">
      <a class="navbar-item" href="/provider">
        <img
          alt="UpSwyng: Resources within reach"
          src="static/upswyng_arrow.svg" />
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
        <a
          class:has-text-weight-bold={!segment}
          class="navbar-item"
          href="/provider">
          Home
        </a>
        <a
          class:has-text-weight-bold={segment === 'resource'}
          class="navbar-item"
          href="/provider/resource"
          rel="prefetch">
          Service Providers
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="navbar-link">More</a>

          <div class="navbar-dropdown">
            {#if user && user.isAdmin}
              <a class="navbar-item" href="/provider/alert" rel="prefetch">
                <span>Alerts &nbsp;</span>
                <span class="tag is-dark">Admin</span>
              </a>
              <a
                class="navbar-item"
                href="/provider/resource/issues"
                rel="prefetch">
                <span>Issues &nbsp;</span>
                <span class="tag is-dark">Admin</span>
              </a>
              <a class="navbar-item" href="/provider/eventlogs" rel="prefetch">
                <span>Event Logs &nbsp;</span>
                <span class="tag is-dark">Admin</span>
              </a>
              <a class="navbar-item" href="/provider/bot" rel="prefetch">
                <span class="is-family-monospace">UpSwyngbot &nbsp;</span>
                <span class="tag is-dark">Admin</span>
              </a>
              <a class="navbar-item" href="/provider/users" rel="prefetch">
                <span>Users &nbsp;</span>
                <span class="tag is-dark">Admin</span>
              </a>
              <hr class="navbar-divider" />
            {/if}
            <a class="navbar-item" href="/provider/about">About</a>
            <a class="navbar-item" href="/provider/privacy-policy">
              Privacy Policy
            </a>
            <a class="navbar-item" href="/provider/terms-of-use">
              Terms of Use
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        {#if user && user.name}
          <div class="navbar-item">
            <span class="has-text-weight-semibold">{user.name}</span>
            {#if user && user.isSuperAdmin}
              &nbsp;&nbsp;&nbsp;
              <span class="tag is-primary">Super Admin</span>
            {:else if user && user.isAdmin}
              &nbsp;&nbsp;&nbsp;
              <span class="tag is-black">Admin</span>
            {/if}
          </div>
        {:else if user && user.email}
          <div class="navbar-item">
            <span class="has-text-weight-semibold">{user.email}</span>
            {#if user && user.isSuperAdmin}
              &nbsp;&nbsp;&nbsp;
              <span class="tag is-primary">Super Admin</span>
            {:else if user && user.isAdmin}
              &nbsp;&nbsp;&nbsp;
              <span class="tag is-black">Admin</span>
            {/if}
          </div>
        {/if}
        <div class="navbar-item">
          <div class="buttons">
            {#if !user}
              <a class="button is-primary" href="/provider/login">
                <strong>Log In</strong>
              </a>
            {:else}
              <a class="button" href="/provider/logout">
                <strong>Log Out</strong>
              </a>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>
