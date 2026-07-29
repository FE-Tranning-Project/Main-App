const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const path = require('path');

const config = {
  watchFolders: [path.resolve(__dirname, '../../ui-components')],
  resolver: {
    blockList: [
      /.*\/android\/app\/\.cxx\/.*/,
      /.*\/android\/app\/build\/.*/,
      /.*ui-components[/\\]node_modules[/\\]react[/\\].*/,
      /.*ui-components[/\\]node_modules[/\\]react-native[/\\].*/,
    ],
    extraNodeModules: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
