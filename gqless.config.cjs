const dotenv = require('dotenv');

dotenv.config({
  path: '.env.local',
});

/**
 * @type {import("@gqless/cli").GQlessConfig}
 */
const config = {
  react: false,
  scalarTypes: { DateTime: 'string' },
  introspection: {
    endpoint: `${
      process.env.VITE_WORDPRESS_URL ?? process.env.WORDPRESS_URL
    }/graphql`,
    headers: {},
  },
  destination: './src/lib/client/index.ts',
  subscriptions: false,
  javascriptOutput: false,
};

module.exports = config;
