# UpSwyng

[![Netlify Status](https://api.netlify.com/api/v1/badges/d594885b-4ffa-496d-8e1b-78d23f55e6c2/deploy-status)](https://app.netlify.com/sites/upswyng/deploys)
[![Build Status](https://travis-ci.org/CodeForBoulder/upswyng.svg?branch=master)](https://travis-ci.org/CodeForBoulder/upswyng)

UpSwyng is a digital directory that contains information on local services and providers who serve the homeless community in the Boulder area.

## Setup

The initial project structure was generated using [Create React App](https://github.com/facebook/create-react-app).

### Create `.env.local` file

To use the local development database, you'll only need to create a copy of `.env.local.example` and name that copy `.env.local`.

You can do this via your system's file explorer or via the following terminal command while in the repo:

```
cp .env.local.example .env.local
```

### Google API Key Configuration

You will need an API key for Google Maps JavaScript API/Directions API.
Get started here: [https://cloud.google.com/maps-platform/](https://cloud.google.com/maps-platform/)

Click `Get Started`, select `Maps` and `Routes` and proceed with the setup.

You will be presented with your key, which you will then need to save to your UpSwyng directory's `.env.local` as `REACT_APP_GOOGLE_MAPS_API_KEY=yourUniqueGoogleAPIKeyHere`

Once you've copied the file, you'll need to start/restart the application (see commands section below).

## Commands

### `yarn`

Installs project dependencies.

### `yarn run start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn run test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the build folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
