# UpSwyng Web

This workspace includes the single page application used to surface resources to unhoused or at-risk communitites.

## Setup

_Note: The initial project structure was generated using [Create React App](https://github.com/facebook/create-react-app)._

### 1. Create `.env.local` file

For local development, you'll only need to create a copy of `.env.local.example` and name that copy `.env.local`.

You can do this via your system's file explorer or via the following terminal command while in the repo:

```
cp .env.local.example .env.local
```

### 2. Google API Key Configuration (optional)

If you need to work with the Google Map API for a feature, such as directions retrieved for Google Maps, you'll need an API key for Google Maps JavaScript Directions API. We can provide you a key for local development, but you can also set one up yourself.

If you need a key for development and don't wish to create one, please contact us at (mailto:cfbleader@codeforboulder.org)[mailto:cfbleader@codeforboulder.org].

Once you have a key, you will then need to add/update this line in your `.env.local`:

```
REACT_APP_GOOGLE_MAPS_API_KEY=yourUniqueGoogleAPIKeyHere
```

Once you've saved, you'll need to start/restart the application (see commands section below).

#### Generating Your Own Google API Key

Get started here: [https://cloud.google.com/maps-platform/](https://cloud.google.com/maps-platform/)

Click `Get Started`, select `Maps` and `Routes` and proceed with the setup. Your API key will only need access to the following APIs:

- Maps JavaScript API
- Directions API

## Commands

### `yarn`

Installs project dependencies.

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
