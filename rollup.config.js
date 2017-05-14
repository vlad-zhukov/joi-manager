process.env.NODE_ENV = 'development';

const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');

export default {
    entry: './src/joi-manager.js',

    plugins: [babel()],

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
