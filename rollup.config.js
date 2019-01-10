const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-terser').terser;
const commonjs = require('rollup-plugin-commonjs');

module.exports = {
    external: ['prop-types', 'react', 'react-dom'],
    plugins: [
        resolve({
            extensions: ['.js', '.jsx']
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**'
        }),
        uglify()
    ],
    output: {
        format: 'esm'
    }
};
