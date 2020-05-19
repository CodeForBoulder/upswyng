import * as dotenv from "dotenv";

/**
 * Typescript setup:
 * https://github.com/sveltejs/sapper/issues/760#issuecomment-514967952
 */
import {
  createEnv,
  readConfigFile,
  preprocess as tsPreprocess,
} from "@pyoner/svelte-ts-preprocess";

import autoPreprocess from "svelte-preprocess";
import babel from "rollup-plugin-babel";
import builtins from "rollup-plugin-node-builtins";
import commonjs from "@rollup/plugin-commonjs";
import config from "sapper/config/rollup.js";
import json from "@rollup/plugin-json";
import pkg from "./package.json";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import svelte from "rollup-plugin-svelte";
import { terser } from "rollup-plugin-terser";
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
const styleOpts = {
  scss: {
    includePaths: ["node_modules", "src", "../../node_modules"],
  },
  postcss: {
    plugins: [require("autoprefixer")],
  },
};

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);

// When converting this to a monorepo, something weird happened where the `dedupe` function
// was stopping svelte from being imported at all. Turn it off until it causes problems:
// const dedupe = importee =>
//   importee === "svelte" || importee.startsWith("svelte/");
const dedupe = _importee => false;

dotenv.config();
const {
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY,
  ALGOLIA_INDEX_NAME,
} = process.env;

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        "process.browser": true,
        "process.env.ALGOLIA_APP_ID": JSON.stringify(ALGOLIA_APP_ID),
        "process.env.ALGOLIA_INDEX_NAME": JSON.stringify(ALGOLIA_INDEX_NAME),
        "process.env.ALGOLIA_SEARCH_API_KEY": JSON.stringify(
          ALGOLIA_SEARCH_API_KEY
        ),
        "process.env.RESET_APP_DATA_TIMER": 60 * 2 * 1000, // two minutes; used inside the algoliasearch source
        "process.env.NODE_ENV": JSON.stringify(mode),
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess: [tsPreprocess(tsOpts), autoPreprocess(styleOpts)],
      }),
      // The 'rrule' 'module' entrypoint has mixed `import` and `require` statements.
      // This is VERY BAD because the `import` statements cause the `commonjs` plugin to ignore the files,
      // but the `require` statement makes it an invalid ES6 module. The 'main' entrypoint doesn't have this
      // problem, so resolve 'rrule' with the 'main' entrypoint.
      resolve({
        only: ["rrule"],
        mainFields: ["main"],
        browser: true,
        dedupe,
      }),
      // All the other modules besides 'rrule' should be resolved with the default entrypoint priority. (Defaults
      // to ['module', 'main'].) See: https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve({
        only: [/^(?!.*rrule).*$/],
        browser: true,
        dedupe,
      }),
      builtins(),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "node_modules/bson/index.js": ["ObjectId"],
          rrule: ["RRule", "RRuleSet"],
        },
      }),
      typescript(tsOpts),
      json(),
      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          runtimeHelpers: true,
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              { modules: false, targets: "> 0.25%, not dead" },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      svelte({
        generate: "ssr",
        dev,
        preprocess: [tsPreprocess(tsOpts), autoPreprocess(styleOpts)],
      }),
      resolve({
        dedupe,
      }),
      typescript(tsOpts),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "node_modules/bson/index.js": ["ObjectId"],
        },
      }),
      json(),
    ],
    external: Object.keys(pkg.dependencies || {})
      .filter(i => !i.match(/@upswyng/))
      .concat(
        require("module").builtinModules ||
          Object.keys(process.binding("natives"))
      ),
    onwarn,
  },
};
