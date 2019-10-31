import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import pkg from "./package.json";
import typescript from "rollup-plugin-typescript2";

const targets = ["syncStrappd", "updateAlgolia", "setupCategories"];

export default targets.map(target => ({
  input: `server/data_pipeline/${target}.ts`,
  output: { file: `__build__/${target}.js`, format: "cjs" },
  plugins: [commonjs(), typescript(), json()],
  external: Object.keys(pkg.dependencies || {}).concat(
    require("module").builtinModules || Object.keys(process.binding("natives"))
  )
}));
