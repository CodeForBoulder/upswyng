# Server Scripts

This directory contains the source files of utility scripts for use across the
`@upswyng/upswyng-server` package.

## Shell Scripts

Shell scripts (`.sh` extension) can be executed directly from the source file.

## TypeScript Scripts

TypeScript scripts (`.ts` extension) must be transpiled to Javascript before they
can be executed. To build the scripts, use the `build:bin` npm script:

```bash
yarn workspace @upswyng/upswyng-server build:bin
```

The outputs are written to `packages/upswyng-server/__build__/bin`. The names converted to snake-case and have their extension removed.

Set the `TARGETS` env variable to a comma-separated list of targets to build when running
the `build:bin` script to specify which scripts to build. If no `TARGETS` are set, all the
`.ts` scripts are built.

### Example

To build and run the category setup and the test data scripts from the project root:

```bash
# build scripts
TARGETS=setupCategories,testData yarn workspace @upswyng/upswyng-server build:bin
# setup categories
node ./packages/upswyng-server/__build__/bin/setup_categores
# seed test data
node ./packages/upswyng-server/__build__/bin/test_data
```
