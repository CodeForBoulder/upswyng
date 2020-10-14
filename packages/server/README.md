# UpSwyng Server

This workspace includes:

- an API server which provides data to the UpSwyng client
- an admin web interface which uses the [Svelte](https://svelte.dev/) framework to create and modify data for the project

## Setup

_Note: This project is built upon [Sapper](https://github.com/sveltejs/sapper), which uses a combination of [Svelte](https://svelte.dev/) and [Polka](https://github.com/lukeed/polka) to build and serve the app._

### 1. Setup Local MongoDB or Request Access to Dev Database

To get this project functional, you'll need to have a MongoDB instance running. That can either be done [locally](https://docs.mongodb.com/manual/installation/) or by using our DEV database.

If you don't want to setup your own instance, please make a request for our DEV database credentials in [Slack](https://join.slack.com/t/cfb/shared_invite/enQtODg3NDgxODM3NzE1LTE2ZmU1MTdiYjlmMWQ5MmE0YmEwOTJlZTdjYzJlMjkxYTlhYWI5YmY0YTQxMzRiY2U4OGMwMDk1ZmY0NzNiMGU) or send an email to [cfbLeaders@codeforboulder.org](mailto:cfbLeaders@codeforboulder.org).

### 2. Create `.env`

For local development, you'll only need to create a copy of `.env.example` and name that copy `.env`.

You can do this via your system's file explorer or via the following terminal command while in the repo:

```console
cp .env.example .env
```

At minimum, the following values will need to be updated with credentials created in setup 1:

```
DATABASE_PASSWORD
DATABASE_SESSION_SECRET
DATABASE_URL
DATABASE_USER
```

This file contains placeholders for various API keys that you may or may not need to provide. This depends on the issue you are addressing. For example, if you're working on a feature that is only enabled for admins, then you'll also need to provide API keys for one of our OAuth providers.

### 2. Start the Server

```console
yarn dev
```

Runs the app in the development mode. Open [http:/localhost:3000](http:/localhost:3000) to view it in the browser.

## Commands

### `yarn`

Installs project dependencies.

### `yarn dev`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn test`

Launches both unit and end-to-end tests.

### `yarn test:e2e`

Launches end-to-end tests.

### `yarn test:unit`

Launches unit tests.

### `yarn build`

Start a production version of the app. This will disable live reloading, and activate the appropriate bundler plugins.

```

```
