import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import pkg from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import { createEnv, readConfigFile } from "@pyoner/svelte-ts-preprocess";

const env = createEnv();
const compilerOptions = readConfigFile(env, "../../tsconfig.json");
const tsOpts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true,
    verbosity: 3,
  },
  tsconfig: "../../tsconfig.json",
  include: ["*.ts+(|x)", "../../**/*.ts+(|x)"],
};

const targets = ["syncStrappd", "updateAlgolia", "setupCategories"];

export default targets.map(target => ({
  input: `./src/data-pipeline/${target}.ts`,
  output: { file: `__build__/${target}.js`, format: "cjs" },
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
}));
