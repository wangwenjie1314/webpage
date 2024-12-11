const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "util": require.resolve("util/"),
    "stream": require.resolve("stream-browserify"),
    "path": require.resolve("path-browserify"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "url": require.resolve("url/"),
    "fs": false,
    "assert": require.resolve("assert/"),
    "tty": require.resolve("tty-browserify"),
    "os": require.resolve("os-browserify"),
    "zlib": require.resolve("browserify-zlib"),
    "events": require.resolve("events/"),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    // 添加这个插件来处理 TextEncoder
    new webpack.NormalModuleReplacementPlugin(
      /node:util|util/,
      (resource) => {
        if (resource.request === 'util') {
          resource.request = 'util/util.js';
        }
      }
    ),
  ];

  // 添加这个配置来提供全局的 TextEncoder
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false,
    },
  });

  return config;
}