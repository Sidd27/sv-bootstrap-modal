import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: [
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
  ],
  plugins: [
    svelte({
      emitCss: false,
      compilerOptions: {
        runes: true,
      },
    }),
    resolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.svelte'],
      dedupe: ['svelte'],
    }),
    commonjs(),
    production && terser(),
  ],
  external: (id) => id === 'svelte' || id.startsWith('svelte/'),
  watch: {
    clearScreen: false,
  },
};
