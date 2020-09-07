# UpSwyng Server

This workspace includes:

- an API server which provides data to the UpSwyng client
- an admin web interface which uses the [Svelte](https://svelte.dev/) framework to create and modify data for the project

_Note: This project is built upon [Sapper](https://github.com/sveltejs/sapper), which uses a combination of [Svelte](https://svelte.dev/) and [Polka](https://github.com/lukeed/polka) to build and serve the app._

## Setup

The greatest barrier to getting up-and-running with server, is that it requires

## Production mode and deployment

To start a production version of your app, run `npm run build && npm start`. This will disable live reloading, and activate the appropriate bundler plugins.

You can deploy your application to any environment that supports Node 8 or above. As an example, to deploy to [Now](https://zeit.co/now), run these commands:

```bash
npm install -g now
now
```
