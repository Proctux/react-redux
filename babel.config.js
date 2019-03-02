module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV)

  const isDevelopment = api.env('development')
  const isProduction = api.env('production')

  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-inline-elements',
    '@babel/plugin-transform-runtime',
  ]

  if (isProduction) {
    plugins.push('transform-react-remove-prop-types')
  }

  return {
    plugins,
    presets: [
      ['@babel/preset-env', { modules: false, useBuiltIns: 'entry' }],
      ['@babel/preset-react', { development: isDevelopment }],
    ],
  }
}
