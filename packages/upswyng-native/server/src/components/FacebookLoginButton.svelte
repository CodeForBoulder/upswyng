<script>
  export let href; // link to open when button is pressed
</script>

<style>
  a {
    display: block;
    border: 0;
    height: 31px;
    padding: 0;
    width: 191px;
  }

  img {
    height: 100%;
    width: 100%;
  }
</style>

<a href={href}>
  <img alt="Continue with Facebook" src="/facebook_signin.png" />
</a>
