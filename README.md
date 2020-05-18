![UpSwyng Logo](./upswyng.svg)

# UpSwyng

> UpSwyng is a mobile-ready, digital directory of
> resources to assist the unhoused and at-risk communities.
> Coming soon to Boulder, CO.

UpSwyng is a [Code For Boulder](https://www.codeforboulder.org) project.

## Project Organization

![Project Organization Diagram](./upswyng-project-layout.svg)

UpSwyng is a monorepo managed with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). It consists of five
packages all in the `packages` directory: `common` contains common libraries and utilities used across the other packages.
`types` holds the TypeScript definitions used across the project. `server` is a [Sapper](https://sapper.svelte.dev/)
application with two parts: an API server which provides data to the UpSwyng clients, and an admin web interface which uses
the [Svelte](https://svelte.dev/) framework to create and modify data for the project. `web` contains the
[React](https://reactjs.org/) web client, and `native` contains a work-in-progress
[React Native](https://facebook.github.io/react-native/) cleint.

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

> Typing out the full workspace name can get tedious. You can place aliases in your `.bashrc`
> or `.profile` to save time:
>
> ```console
> alias @uw="yarn workspace @upswyng/web "
> ```
>
> Now you only need `@uw start` to start the web dev server.

## Getting Started

Install the Yarn package manager by following the instructions at
[https://yarnpkg.com/lang/en/docs/install](https://yarnpkg.com/lang/en/docs/install)

Next, clone the repo:

```
git clone https://github.com/CodeForBoulder/upswyng.git
```

`cd` into the repo:

```
cd upswyng
```

and install the project dependencies by running

```
yarn
```

Note: the above command may fail if your `node` version is not 12.14.x. [nvm](https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b#d594) is one solution
(among others) to manage `node` versions precisely.

Next, try starting up a development client by running `yarn workspace @upswyng/web start`.

### Development Ports

| Job        | Port |
| ---------- | ---: |
| server     | 3000 |
| web client | 3001 |

### Troubleshooting

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

```
yarn build:local-packages
```

### Next Steps

`cd` into the package you're interested in working on and run the appropriate script. Visit each package's `README` for more
information about environment setup, scripts, and more.

## Contributing

Pull requests are welcome and encouraged! Please review and follow our [guidelines](CONTRIBUTING.md).
