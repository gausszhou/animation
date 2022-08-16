import { uglify } from "rollup-plugin-uglify";
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: "src/animation.ts",
    output: [
      {
        format: "umd",
        file: "lib/animation.umd.js",
        name: "LiteGUI"
      },
      {
        format: "esm",
        file: "lib/animation.esm.js"
      }
    ],
    plugins: [uglify(), typescript()]
  }
];