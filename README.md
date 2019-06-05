# Upswyng

[![Netlify Status](https://api.netlify.com/api/v1/badges/d594885b-4ffa-496d-8e1b-78d23f55e6c2/deploy-status)](https://app.netlify.com/sites/upswyng/deploys)
[![Build Status](https://travis-ci.org/CodeForBoulder/upswyng.svg?branch=master)](https://travis-ci.org/CodeForBoulder/upswyng)

Upswyng is a digital directory that contains information on local services and providers who serve the homeless community in the Boulder area.

## Development

The initial project structure was generated using [Create React App](https://github.com/facebook/create-react-app).

### Commands

#### `npm i`

Installs project dependencies.

#### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.

See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the build folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

#### `npm run datapipe`

Retrieves latest data and filters it for our target locale.

### Google API Key Configuration

You will need an API key for Google Maps JavaScript API/Directions API.
Get started here: [https://cloud.google.com/maps-platform/](https://cloud.google.com/maps-platform/)

Click `Get Started`, select `Maps` and `Routes` and proceed with the setup.

You will be presented with your key, which you will then need to save to your Upswyng directory's `.env.local` as `REACT_APP_GOOGLE_MAPS_API_KEY=yourUniqueGoogleAPIKeyHere`

## Contributing

### 1. Find an Issue Pending Development, Needing Help, or Asking a Question

Want to develop? All issues that have been approved for development, but have not been started will be labelled as **Status: Pending**.

We'd love your input on possible new features. Some issues aren't ready for development and won't have a status label. These issues may need more input before being approved and instead be labelled **Type: Help Wanted**.

Maybe you have the answer to someone's question. Look through any issues labelled with **Type: Help Wanted** and comment with your answer.

### 2. Work on an Issue

Once you have have found an issue you feel comfortable working on, request to work on the issue and we'll label the issue as **Status: In Progress** to make sure others don't work on it as well.

Then, create a new branch off the current `master`.

#### Branch Naming

All feature branch names will begin with a group-token, be proceed by a short name describing what the branch addresses, and finally end with the issue this branch addresses.

**`grouptoken/short-name-#issuenumber`**

Below are approved group-tokens:

- **`add/`** : identifies a branch that _adds_ a feature
- **`updt/`** : identifies a branch that _updates_ a feature. This is useful for features whose original feature branches were deleted, or have already been merged with the master branch.
- **`rmv/`** : identifies a branch that _removes_ a feature.
- **`exp/`** : identifies a branch that _experiments_ with creating a new feature without plans of implementation.

For example, if you wanted to create a branch that update the way a service was displayed which is described in issue 36, you could name the branch **`updt/service-display-#36`**.

### 3. Create a Pull Request (PR)

Once you believe your feature is ready for production, create a PR and reference what issue this addresses in the PR's description.

If there any updates requested, please make those updates on your local branch and re-push that branch to the repository.

If approved, project managers will handle merging and deploying.
