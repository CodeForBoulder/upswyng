import { terser } from "rollup-plugin-terser";
import autoPreprocess from "svelte-preprocess";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import config from "sapper/config/rollup.js";
import json from "rollup-plugin-json";
import pkg from "./package.json";
import replace from "rollup-plugin-replace";
import resolve from "rollup-plugin-node-resolve";
import svelte from "rollup-plugin-svelte";

/**
 * Typescript setup:
 * https://github.com/sveltejs/sapper/issues/760#issuecomment-514967952
 */
import {
  createEnv,
  preprocess as tsPreprocess,
  readConfigFile
} from "@pyoner/svelte-ts-preprocess";
import typescript from "rollup-plugin-typescript2";
const env = createEnv();
const compilerOptions = readConfigFile(env);
const tsOpts = {
  env,
  compilerOptions: {
    ...compilerOptions,
    allowNonTsExtensions: true
  }
};
const styleOpts = {
  scss: {
    includePaths: ["node_modules", "server/src"]
  },
  postcss: {
    plugins: [require("autoprefixer")]
  }
};

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);
const dedupe = importee =>
  importee === "svelte" || importee.startsWith("svelte/");

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess: [tsPreprocess(tsOpts), autoPreprocess(styleOpts)]
      }),
      resolve({
        browser: true,
        dedupe
      }),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "node_modules/bson/index.js": ["ObjectId"],
          "node_modules/fast-equals/dist/fast-equals.js": ["deepEqual"]
        }
      }),
      typescript(),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          runtimeHelpers: true,
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              { modules: false, targets: "> 0.25%, not dead" }
            ]
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true
              }
            ]
          ]
        }),

      !dev &&
        terser({
          module: true
        })
    ],

    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        "process.browser": false,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      svelte({
        generate: "ssr",
        dev,
        preprocess: [tsPreprocess(tsOpts), autoPreprocess(styleOpts)]
      }),
      resolve({
        dedupe
      }),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "node_modules/bson/index.js": ["ObjectId"],
          "node_modules/fast-equals/dist/fast-equals.js": ["deepEqual"]
        }
      }),
      typescript(),
      json()
    ],
    external: Object.keys(pkg.dependencies || {}).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),

    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        "process.browser": true,
        "process.env.NODE_ENV": JSON.stringify(mode)
      }),
      commonjs({
        include: /node_modules/,
        namedExports: {
          "node_modules/bson/index.js": ["ObjectId"],
          "node_modules/fast-equals/dist/fast-equals.js": ["deepEqual"]
        }
      }),
      typescript(),
      !dev && terser()
    ],

    onwarn
  }
};
