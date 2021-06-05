/* eslint-disable */
const path = require("path");
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        modifyLessRule: (rule) => {
          rule.use.push({
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: require('./src/theme/variables.js'),
                javascriptEnabled: true,
              },
            },
          });
          return rule;
        },
      },
    },
  ], 
  webpack: {
    alias: {
      '@sb-ui': path.resolve(__dirname, 'src/'),
    },
  },
  babel: {
    plugins: ['babel-plugin-styled-components'],
  },
};
