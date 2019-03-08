module.exports = api => {
  const isDevelopment = api.env('development')
  const isProduction = api.env('production')
  const isTest = api.env('test')

  const plugins = ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-react-inline-elements', '@babel/plugin-transform-runtime']

  if (isProduction) {
    plugins.push('transform-react-remove-prop-types')
  }

  return {
    plugins,
    presets: [
      [
        '@babel/preset-env',
        {
          modules: isTest ? 'commonjs' : false,
          useBuiltIns: 'entry',
        },
      ],
      ['@babel/preset-react', { development: isDevelopment }],
    ],
  }
}
