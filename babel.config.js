/* eslint-disable */
module.exports = function(api) {
  api.cache(false);
  return {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {
            node: '10',
          },
        },
      ],
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
