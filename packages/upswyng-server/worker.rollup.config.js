import { createEnv, readConfigFile } from "@pyoner/svelte-ts-preprocess";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";

const env = createEnv();
const compilerOptions = readConfigFile(env, "./tsconfig.build.json");
const tsOpts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true,
    verbosity: 3,
  },
  include: ["*.ts+(|x)", "./**/*.ts+(|x)"],
  tsconfig: "./tsconfig.build.json",
};

export default {
  input: `./src/worker.ts`,
  output: { file: `__build__/worker.js`, format: "cjs" },
  plugins: [
    resolve(),
    typescript(tsOpts),
    commonjs({ exclude: [/^.+\.tsx?$/] }),
    json(),
  ],
  external: Object.keys(pkg.dependencies || {})
    .filter(i => !i.match(/@upswyng/))
    .concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),
};
