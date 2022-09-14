import { uglify } from "rollup-plugin-uglify";
// import typescript from '@rollup/plugin-typescript';
import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: "src/animation.ts",
    output: [
      {
        format: "umd",
        file: "lib/animation.umd.js",
        name: "animation"
      },
      {
        format: "esm",
        file: "lib/animation.esm.js"
      }
    ],
    plugins: [uglify(), typescript()]
  }
];