![UpSwyng Logo](./upswyng.svg)

# UpSwyng

> UpSwyng is a mobile-ready, digital directory of
> resources to assist the unhoused and at-risk communities.
> Coming soon to Boulder, CO.

UpSwyng is a [Code For Boulder](https://www.codeforboulder.org) project.

## Project Organization

![Project Organization Diagram](./upswyng-project-layout.svg)

UpSwyng is a monorepo managed with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). It consists of five packages all in the `packages` directory: `upswyng-core` contains common libraries and utilities used across the other packages. `upswyng-types` holds the TypeScript definitions used across the project. `upswyng-server` is a [Sapper](https://sapper.svelte.dev/) application with two parts: an API server which provides data to the UpSwyng clients, and an admin web interface which uses the [Svelte](https://svelte.dev/) framework to create and modify data for the project. `upswyng-web` contains the [React](https://reactjs.org/) web client, and `upswyng-native` contains a work-in-progress [React Native](https://facebook.github.io/react-native/) cleint.

## Working With Yarn Workspaces

To run a command in a specific package, use the `yarn workspace` command from the project root.
For example, to start the web package development server run:

```console
yarn workspace @upswyng/upswyng-web start
```

To run the same command in _all_ workspaces, use `yarn workspaces`. For instance, to run `test` in all packages use:

```console
yarn workspaces test
```

> Typing out the full workspace name can get tedious. You can place aliases in your `.bashrc`
> or `.profile` to save time:
>
> ```console
> alias @uw="yarn workspace @upswyng/upswyng-web "
> ```
>
> Now you only need `@uw start` to start the web dev server.

## Getting Started

Install the Yarn package manager by following the instructions at [https://yarnpkg.com/lang/en/docs/install](https://yarnpkg.com/lang/en/docs/install)

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

Note: the above command may fail if your `node` version is not 12.14.x. [nvm](https://itnext.io/nvm-the-easiest-way-to-switch-node-js-environments-on-your-machine-in-a-flash-17babb7d5f1b#d594) is one solution (among others) to manage `node` versions precisely.

Next, try starting up a development client by running `yarn workspace @upswyng/upswyng-web start`.

### Development Ports

| Job        | Port |
| ---------- | ---: |
| server     | 3000 |
| web client | 3001 |

### Troubleshooting

#### Type Errors

The packages `upswyng-native`, `upswyng-server`, and `upswyng-web` depend on `upswyng-core` and `upswyng-types`. If you edit `upswyng-core` or `upswyng-types`, or pull a new commit which contains edits to
those packages, they need to be rebuilt. If you do not rebuild, you may see a type error like:

```
/upswyng/packages/upswyng-server/src/utility/slackbot.ts(116,10): semantic error TS2678: Type '"user_permission_changed"' is not comparable to type '"draft_approved" | "draft_created" | "draft_deleted" | "resource_issue_reopened" | "resource_issue_resolved"'.
```

To fix this, run the script:

```
yarn build-local-packages
```

### Next Steps

`cd` into the package you're interested in working on and run the appropriate script. Visit each package's `README` for more information about environment setup, scripts, and more.

## Contributing

Before contributing, please review and abide by [Code for Boulder's Code of Conduct](http://www.codeforboulder.org/code-of-conduct).

### 1. Find an Issue Pending Development, Needing Help, or Asking a Question

Want to develop? All issues that have been approved for development, but have not been started will be labelled as **Status: Pending**.

We'd love your input on possible new features. Some issues aren't ready for development and won't have a status label. These issues may need more input before being approved and instead be labelled **Type: Help Wanted**.

Maybe you have the answer to someone's question. Look through any issues labelled with **Type: Help Wanted** and comment with your answer.

### 2. Work on an Issue

Once you have have found an issue you feel comfortable working on, request to work on the issue and we'll label the issue as **Status: In Progress** to make sure others don't work on it as well.

Then, create a new branch off the current `master`.

#### Branch Naming

All feature branch names should briefly describe what the branch addresses using [kebab-case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).

For example, if you wanted to create a branch that update the way a service was displayed which is described in issue 36, you could name the branch **`update-service-display`**.

### 3. Create a Pull Request (PR)

Once you believe your feature is ready for production, create a PR and reference what issue this addresses in the PR's description.

If there any updates requested, please make those updates on your local branch and re-push that branch to the repository.

If approved, project managers will handle merging and deploying.
