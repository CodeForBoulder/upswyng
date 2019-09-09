<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`api/resource/${params.id}`);
    const data = await res.json();
    if (res.status === 200) {
      return { resource: data.resource };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  export let resource;
</script>

<svelte:head>
  <title>Upswyng: {resource.name}</title>
</svelte:head>

<h1>{resource.name}</h1>

<div class="content">
  <p>{resource.description}</p>
  <p>{JSON.stringify(resource.address,null,2)}</p>
</div>
