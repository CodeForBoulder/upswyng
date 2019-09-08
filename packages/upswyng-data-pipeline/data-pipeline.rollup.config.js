import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "server/data_pipeline/syncStrappd.ts",
  output: { file: "__build__/syncStrappd.js", format: "cjs" },
  plugins: [commonjs(), typescript(), json()],
  external: Object.keys(pkg.dependencies || {}).concat(
    require("module").builtinModules || Object.keys(process.binding("natives"))
  )
};
