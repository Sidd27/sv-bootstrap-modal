import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';


const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: [
		{
		  file: pkg.module,
		  format: 'es',
		  sourcemap: true,
		  name: pkg.name
		},
		{
		  file: pkg.main,
		  format: 'umd',
		  sourcemap: true,
		  name: pkg.name
		}
	  ],
	plugins: [
		svelte({
			dev: !production,
			hydratable: true
		}),
		resolve({
			dedupe: ['svelte']
		}),
		commonjs(),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
