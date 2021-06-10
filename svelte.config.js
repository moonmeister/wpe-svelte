/** @type {import('@sveltejs/kit').Config} */

// import node from '@sveltejs/adapter-node';

export default {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		// adapter: node()
		vite: {
      resolve: {
        alias: {
          // 'svelte-apollo': '/node_modules/svelte-apollo/dist/svelte-apollo.es.js',
					// 'graphql-tag': '/node_modules/graphql-tag/lib/index.js',
					// 'universal-cookie': '/node_modules/universal-cookie/'
        },
      },
    },
		trailingSlash: "always",
	}
};

