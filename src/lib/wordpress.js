
import { getPostsQuery, headlessConfig, getContentNodeQuery, parseContentNodeQuery} from "@wpengine/headless-core"
import { WP_DOMAIN, WP_SECRET } from "$lib/env"

let fetchConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },

};

const { wpUrl }  = headlessConfig({
  wpUrl: WP_DOMAIN,
  apiClientSecret: WP_SECRET
})

let WpPath;

try {
   WpPath = new URL('/graphql', wpUrl).toString();

} catch(e){
  console.error(`Invalid WP URL: ${wpUrl}`)
}

export async function posts({fetch}, options = {}){
  const res = await fetch(WpPath, {
    ...fetchConfig,
    body: JSON.stringify({
      query: getPostsQuery(options).loc.source.body,
      variables: options?.variables
    })
  })

  // if (!res.ok()) {
  //   throw new Error('uanble to fetch posts')
  // }

  return res.json()
}



// export async function generalSettings(fetch) {
//     const res = await fetch(WpPath, 
//     {
//       ...fetchConfig,
//       body: JSON.stringify({
//         query: GENERAL_SETTINGS,
//         variables: options?.variables
//       })
//     })

//     return res.json()
// }

export async function contentNode({fetch, page}, options) {
  const opts = {
    variables: {
      asPreview: page.query.get('preview'),
      id: page.path,
      idType: 'URI',
    },
    ...options
  }
  const res = await fetch(WpPath, 
  {
    ...fetchConfig,
    body: JSON.stringify({
      query: getContentNodeQuery(opts).loc.source.body,
      variables: opts?.variables
    })
  })

  const result = await res.json()

  return parseContentNodeQuery(result, opts)
}

export async function menu({fetch}, menuName) {
  const res = await fetch(WpPath, {
    ...fetchConfig,
    body: JSON.stringify({
      query: `
      query MENU_BY_NAME($name: ID!) {
        menu(id: $name, idType: NAME) {
          name
          databaseId
          menuItems {
            nodes {
              label
              path
            }
          }
        }
      }
      
      `,
      variables: {name: menuName}
    })
  })

  return res.json()
}