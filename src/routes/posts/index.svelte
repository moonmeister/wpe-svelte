
<script context='module'>
	import { posts } from "$lib/wordpress";
	import { getPosts} from "@wpengine/headless-core"
  import { browser, dev } from '$app/env';

	export const hydrate = false;


	export async function load (loadApi) {
		// const {data: { posts: {nodes: allPosts }}} = await posts(loadApi)
		const allPosts = await getPosts(loadApi.context.client, {})
		console.log("posts", allPosts)

		if (!Array.isArray(allPosts.nodes)) {
			return 
		}

		return {
			props: {
				posts: allPosts.nodes,
			},
			maxage: 5000,
		}
	}
</script>
<script>

	export let posts;

	// if (!posts) {
	// 	posts = [];
	// }

</script>
	<div>
		<ul>
			<!-- {@debug posts} -->
			{#each posts as post}
			post
			{"post", post.title}
				<li>
					<a href={post.uri}>

						<article>
							<h1>{post.title}</h1>
							<div>
								{@html post.excerpt}
							</div>
						</article>
					</a>
				</li>
			{/each}
		</ul>
	</div>

<style>
	ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	li {
		border: 2px black solid;
	}

	article {
		padding: 2rem;
	}
</style>
