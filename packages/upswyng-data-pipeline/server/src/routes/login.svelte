<script>
  import FacebookLoginButton from "../components/FacebookLoginButton.svelte";
  import GoogleLoginButton from "../components/GoogleLoginButton.svelte";
</script>

<style>
  ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0 auto 3em auto;
  }

  li {
    margin-bottom: .5em;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login to Upswyng</h1>
<ul class="sign-in-buttons">
  <li>
    <FacebookLoginButton href="/connect/facebook" />
  </li>
  <li>
    <GoogleLoginButton href="/connect/google" />
  </li>
</ul>
