<script context="module">
	import {headlessConfig, getApolloClient} from "@wpengine/headless-core"
	import { WP_DOMAIN, WP_SECRET} from "$lib/env"
	headlessConfig(
		{
			wpUrl: WP_DOMAIN,
			apiClientSecret: WP_SECRET
		}
	);
	import { menu } from "$lib/wordpress"

	export async function load(loadApi) {
		const {page } = loadApi
		const {data: {menu: {menuItems}}} = await menu(loadApi, 'Main')
		return {
			props: {
				menuItems: menuItems?.nodes
			},
			context: {
				client: getApolloClient(),
				isPreview: page.query.get('preview') ? true : false
			}
		}
	}

</script>

<script>
	import Header from '$lib/Header/index.svelte';

	export let menuItems;

	import '../app.css';
</script>

<Header {menuItems} />

<main>
	<slot />
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
