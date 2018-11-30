/* eslint-disable */
module.exports = function(api) {
  api.cache(false);
  return {
    presets: [
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: { '~': './src' },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
    retainLines: true,
  };
};
