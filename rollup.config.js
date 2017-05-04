/* eslint-disable import/first, import/extensions */

process.env.NODE_ENV = 'development';

import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

const pkg = require('./package.json');

export default {
    entry: './src/index.js',

    plugins: [
        babel(
            babelrc({
                addModuleOptions: false,
            })
        ),
    ],

    targets: [
        {
            dest: pkg.main,
            format: 'cjs',
            sourceMap: true,
        },
        {
            dest: pkg.module,
            format: 'es',
            sourceMap: true,
        },
    ],

    external: Object.keys(pkg.peerDependencies),
};
