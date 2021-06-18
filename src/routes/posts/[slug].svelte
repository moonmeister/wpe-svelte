<script context="module">
    // import {contentNode} from "$lib/wordpress"
    import {getContentNode} from "@wpengine/headless-core"
    import { browser, dev } from '$app/env';

    export const hydrate = dev;
    
    export async function load ({ page, fetch, context}) {

		// const data = await contentNode({fetch, page})
      const data = await getContentNode(context.client, {variables: {
        asPreview: false,
        id: page.path,
        idType: 'URI',
      }})
      console.log('post', data)
    if (!data) {
      return null
    }
		return {
			props: {
				data,
			},
      maxage: 5000,
		}
	}
</script>
<script>

export let data;

// console.log(data)

</script>
<style>
    ul {
        list-style: none;
    }

    li {
        border: 2px black solid;
    }
</style>
<svelte:head>
  <title>{data.title}</title>
</svelte:head>
<div>
  <article>
    <header>
      <h1>{data.title}</h1>
    </header>
    <div>{@html data.content}</div>
  <footer><h2>Post Template</h2></footer>

  </article>
  <section>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
  </section>
</div>