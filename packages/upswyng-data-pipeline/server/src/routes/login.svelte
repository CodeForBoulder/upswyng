<script>
  import GoogleLoginButton from "../components/GoogleLoginButton.svelte";
</script>

<style>
  ul {
    align-items: center;
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0 auto;
  }

  li {
    margin-bottom: 24px;
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>

<h1>Login to UpSwyng</h1>

<ul class="sign-in-buttons">
  <li>
    <GoogleLoginButton href="/connect/google" />
  </li>
</ul>
