<script>
  import { About } from "@upswyng/common";
  import insane from "insane"; // html sanitizer
  import marked from "marked";

  $: aboutContent = insane(marked(About), {
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
    <h1 class="title is-3">About UpSwyng</h1>
    <div class="content">
      {@html aboutContent}
    </div>
  </div>
</section>
