import { headlessConfig, client as createClient } from "@wpengine/headless-core";

headlessConfig({
  wpUrl: process.env.VITE_WORDPRESS_URL,
  apiClientSecret: process.env.VITE_WP_HEADLESS_SECRET,
})


const client = createClient()

const {query, resolved} = client

const posts = query.posts().nodes;

const results = posts.map(post => {
  const result = {
    id: post.id,
    excerpt: post.excerpt,
    title: post.title,
    uri: post.uri,
  }
  console.log(result)
  return result
})

console.log(results)