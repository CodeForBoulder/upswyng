<script>
  export let segment;
  export let user; // ?TUser
</script>

<style>
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
  }

  ul {
    margin: 0;
    padding: 0;
    display: flex;
  }

  li {
    display: block;
  }

  div.spacer {
    flex: 1;
  }

  .admin {
    position: relative;
    display: inline-block;
    color: gray;
  }

  .selected {
    position: relative;
    display: inline-block;
  }

  .selected::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a,
  .admin span {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>

<nav>
  <ul>
    <li>
      <a class={segment === undefined ? 'selected' : ''} href=".">home</a>
    </li>

    <!-- for the resources link, we're using rel=prefetch so that Sapper prefetches
		     the resources data when we hover over the link or tap it on a touchscreen -->
    <li>
      <a class={segment === 'resource' ? 'selected' : ''} href="resource">
        resources
      </a>
    </li>
    <div class="spacer" />
    {#if user && user.isAdmin}
      <li class="admin">
        <span>admin</span>
      </li>
    {/if}
    {#if !user}
      <li class="login">
        <a class={segment === 'login' ? 'selected' : ''} href="login">log in</a>
      </li>
    {:else}
      <li class="logout">
        <a href="logout">log out</a>
      </li>
    {/if}
  </ul>
</nav>
