<h1><img src="./upswyng.svg" alt="UpSwyng" maxWidth="350px" /></h1>

UpSwyng is a mobile-ready, digital directory of resources to assist the unhoused and at-risk communities. This is a [Code For Boulder](https://www.codeforboulder.org) project coming soon to Boulder County, Colorado.

## Getting Started

If you have any issues getting started using these directions, please see the [Troubleshooting section](#Troubleshooting).

1. Install the Yarn package manager by following the instructions at
   [https://yarnpkg.com/lang/en/docs/install](https://yarnpkg.com/lang/en/docs/install)

2. While in the root of this repo, install all project dependencies by running

   ```console
   yarn
   ```

3. Next, try starting try running the web client by entering `yarn workspace @upswyng/web start`. This command will start in on port 3000. For specific setup instructions on the two main projects, see their corresponding READMEs.

## Project Organization

![Project Organization Diagram](./upswyng-project-layout.svg)

UpSwyng is a monorepo managed with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). It consists of five
packages all in the `packages` directory:

- [common](https://github.com/CodeForBoulder/upswyng/tree/master/packages/common) - contains common libraries and utilities used across the other packages
- [types](https://github.com/CodeForBoulder/upswyng/tree/master/packages/types) - contains the TypeScript definitions used across the project
- [server](https://github.com/CodeForBoulder/upswyng/tree/master/packages/server) - a [Sapper](https://sapper.svelte.dev/) application with two parts:
  - an API server which provides data to the UpSwyng clients
  - an admin web interface which uses the [Svelte](https://svelte.dev/) framework to create and modify data for the project
- [web](https://github.com/CodeForBoulder/upswyng/tree/master/packages/web) - contains the [React](https://reactjs.org/) web client
- [native](https://github.com/CodeForBoulder/upswyng/tree/master/packages/native) - contains a proof-of-concept [React Native](https://facebook.github.io/react-native/) client

## Working With Yarn Workspaces

To run a command in a specific package, use the `yarn workspace` command from the project root.
For example, to start the web package development server run:

```console
yarn workspace @upswyng/web start
```

To run the same command in _all_ workspaces, use `yarn workspaces`. For instance, to run `test` in all packages use:

```console
yarn workspaces test
```

Typing out the full workspace name can get tedious. You can place aliases in your `.bashrc` or `.profile` to save time:

```console
alias @uw="yarn workspace @upswyng/web "
```

Now you only need `@uw start` to start the web dev server.

## Local Database

> Prerequisites

[Docker](https://docs.docker.com/docker-for-mac/) needs to be installed and running.

If you are not sure, run `docker` in your terminal.

> Commands

From your root directory...

```sh
yarn local-db # Build and start the local database and expose it at port localhost:56000

yarn workspace @upswyng/server build:local-db # Build the local-db image with the tag 'upswyng-db'

yarn workspace @upswyng/server start:local-db # Start a new container from the upswyng-db image with the name 'upswyng-local-db' and expose it at localhost:56000

yarn workspace @upswyng/server stop:local-db # Force stop your container 'upswyng-local-db'
```

> Environment

The local database has no security precautions. To connect your server to your local database, simply add this line to your blank .env file located at `packages/server/.env`.

```txt
DATABASE_URL=mongodb://localhost:56000/upswyng-dev
```

### Troubleshooting

#### The engine "node" is incompatible with this module.

When running `yarn` to install project dependencies, you may see a message that looks similar to:

```
The engine "node" is incompatible with this module. Expected version "^14.3.x". Got "11.15.0".
```

This just means that your machine's current version of node does not match the version required to run the UpSwyng server, 12.14.x. To fix this you'll need to install and which your current version of Node. [nvm](https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b#d594) is a helpful tool, among others, you could use to easily switch between node versions.

#### Type Errors

The packages `native`, `server`, and `web` depend on `common` and `types`. If you edit
`common` or `types`, or pull a new commit which contains edits to those packages, they need to be rebuilt.
If you do not rebuild, you may see a type error like:

```
upswyng/packages/server/src/utility/slackbot.ts(76,23): semantic error TS2551:
Property 'DraftApproved' does not exist on type '{ alert_live: any; draft_approved: any;
draft_created: any; draft_deleted: any; resource_issue_reopened: any; resource_issue_resolved: any;
user_permission_changed: any; }'. Did you mean 'draft_approved'?
```

To fix this, run the script:

```console
yarn build:local-packages
```

## Contributing

Pull requests are welcome and encouraged! Please review and follow our [guidelines](CONTRIBUTING.md).
