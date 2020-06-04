<script>
  import { About } from "@upswyng/common";
  import insane from "insane"; // html sanitizer

  $: aboutContent = insane(About, {
    ...insane.defaults,
    allowedAttributes: {
      ...insane.defaults.allowedAttributes,
      iframe: [],
    },
  });
</script>

<svelte:head>
  <title>About</title>
</svelte:head>

<section class="section">
  <div class="container">
    <div class="content">
      {@html aboutContent}
    </div>
  </div>
</section>
