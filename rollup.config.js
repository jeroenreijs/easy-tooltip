import terser from '@rollup/plugin-terser';
import scss from 'rollup-plugin-scss';
import pkg from './package.json';

export default {
  input: 'src/js/index.js',
  plugins: [
    terser(),
    scss({
      fileName: 'easy-tooltip.min.css',
      outputStyle: 'compressed',
    }),
  ],
  output: [
    {
      name: 'easyTooltip',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
};
