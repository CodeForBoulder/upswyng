<script>
  import { PrivacyPolicyContent } from "@upswyng/common";
  import insane from "insane";

  $: sanitizedPrivacyPolicyContent = insane(PrivacyPolicyContent, {
    ...insane.defaults,
    allowedAttributes: {
      ...insane.defaults.allowedAttributes,
      iframe: [],
    },
  });
</script>

<svelte:head>
  <title>Privacy Policy</title>
</svelte:head>

<section class="section">
  <div class="container">
    <div class="content">
      {@html sanitizedPrivacyPolicyContent}
    </div>
  </div>
</section>
