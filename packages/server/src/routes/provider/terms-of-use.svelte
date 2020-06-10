<script>
  import { TermsOfUseContent } from "@upswyng/common";
  import insane from "insane";

  $: sanitizedTermsOfUseContent = insane(TermsOfUseContent, {
    ...insane.defaults,
    allowedAttributes: {
      ...insane.defaults.allowedAttributes,
      iframe: [],
    },
  });
</script>

<svelte:head>
  <title>Terms of Use</title>
</svelte:head>

<section class="section">
  <div class="container">
    <div class="content">
      {@html sanitizedTermsOfUseContent}
    </div>
  </div>
</section>
