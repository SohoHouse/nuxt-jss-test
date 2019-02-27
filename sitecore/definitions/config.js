const consola = require('consola')

consola.info('Enabling Babel 7 transpilation for the manifest...');
// register Babel compiler
require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  // override Vue default Babel config
  babelrc: false,
});
