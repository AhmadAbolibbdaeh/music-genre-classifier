const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    "fs": false,
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "buffer": require.resolve("buffer/"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert/"),
    "zlib": require.resolve("browserify-zlib"),
    "react-native-fs": false // Explicitly exclude react-native-fs
  };

  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  ]);

  return config;
};
