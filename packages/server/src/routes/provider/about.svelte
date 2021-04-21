<script>
  import { AboutContent } from "@upswyng/common";
  import insane from "insane";

  $: sanitizedAboutContent = insane(AboutContent.en, {
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
      {@html sanitizedAboutContent}
    </div>
  </div>
</section>
