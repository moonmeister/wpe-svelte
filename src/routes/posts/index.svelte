<script context="module">
	// import { posts } from "$lib/wordpress";
	// import { getPosts} from "@wpengine/headless-core"
  import { browser, dev } from '$app/env';

	export const hydrate = false;


	export async function load (loadApi) {
		const { context: { client: { query, resolved }}} = loadApi
 		// const allPosts = await resolved(() => {
			//  const posts = query.posts()
			//  console.log('nodes',posts.nodes)
			//  console.log('obj', JSON.parse(JSON.stringify(posts.nodes)))
			// console.log(posts)
			//  if (!posts.nodes) {
			// 	 return []
			//  }

			//  console.log(posts.nodes)

			//  return posts.nodes.map((post) => {
			// 	//  console.log(post)
			// 	 return {
			// 		 title: post.title,
			// 		 excerpt: post.excerpt,
			// 		 uri: post.uri,
			// 		 id: post.id
			// 	}
			// })
		// })
		// console.log("posts", allPosts)

		// allPosts.map(post => console.log(post))

		// if (!Array.isArray(allPosts)) {
		// 	return 
		// }

		const posts = await resolved(() => {
			const allPosts = query.posts().nodes
		
			return allPosts.map(post => {
				const result = {
					id: post.id,
					excerpt: post.excerpt,
					title: post.title,
					uri: post.uri,
				}

				console.log(result)
				return result
			})
		});



		return {
			props: {
				posts: posts
			},
			maxage: 5000,
		}
	}
</script>

<script>
	export let posts;

	console.log(posts);

	// if (!posts) {
	// 	posts = [];
	// }
</script>

<div>
	<ul>
		<!-- {@debug posts} -->
		{#each posts as post}
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
