module.exports = {
  presets: [
    ['@babel/env']
  ],
  plugins: [
    ['@babel/transform-runtime', {
      corejs: 2
    }],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
  ],
};
