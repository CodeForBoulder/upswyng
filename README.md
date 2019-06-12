# Upswyng

[![Netlify Status](https://api.netlify.com/api/v1/badges/d594885b-4ffa-496d-8e1b-78d23f55e6c2/deploy-status)](https://app.netlify.com/sites/upswyng/deploys)
[![Build Status](https://travis-ci.org/CodeForBoulder/upswyng.svg?branch=master)](https://travis-ci.org/CodeForBoulder/upswyng)

Upswyng is a digital directory that contains information on local services and providers who serve the homeless community in the Boulder area.

## Setup

The initial project structure was generated using [Create React App](https://github.com/facebook/create-react-app).

### Firebase DB Setup

For local development, you'll want to have your own Firebase database to query data from. Below are the steps for setting up your own database.

#### Create Project

1. If you don't have one already, create a [Google Account](https://account.google.com/)
2. Navigate to the [Firebase Console](https://console.firebase.google.com/)
3. Click the **"New Project"** button
4. Provide a name for your project, such as (but not required to be) `upswyng-local`
5. Read and agree to the terms of service, and click the **"Create Project"** button

#### Initialize Database

1. Navigate to your newly made project (see above) in the [Firebase Console](https://console.firebase.google.com/).
2. In the left, main navigation find and click **Database** in the "Develop" section.
3. Click on the **"Create Database"** button.
4. In the new modal, select **Start in test mode**
5. Click the **"Enable"** button

#### Upload Data to Database

1. Navigate to your newly initialized database (see above).
2. In the dropdown located next to the "Database" header, select **"Realtime Database"**
3. In top, right of the main panel displaying your data, find and open the kebab menu icon (3 stacked dots). In that menu, select **"Import JSON"**.
4. Upload the `data_pipeline/all.json` found in this repo.
5. Click the **"Import"** button.

🎉 You should now see your database populated! 🎉

#### Add an App to Your Firebase Project

1. Return to the **"Project Overview"** page in your Firebase project in your [Firebase Console](https://console.firebase.google.com/)
2. In the "Get started by adding Firebase to your app", find and select the **"Web"** button, which looks like an self close HTML element **</>**.
3. Give your app a nickname you will be able to identify it later, such as (but not required to be) `upswyng-local`
4. Click **"Register App"** button

A new screen should display scripts to be added to a project. Go ahead keep this page open, ignore the instructions given in Firebase, and move on to the next section of this README.

### Update .env.local Variables

After completely setting up your Firebase project and registering your app (above), you'll need to setup some local environment variables to ensure the source compiles correctly.

1. Create a copy of the `.env.local.example` in this repo named `.env.local`
2. In your newly created `.env.local` you'll want to update the value of each of the placeholder variables. Each variable corresponds with your Firebase configuration (see previous section). Below details which variable values match your Firebase configuration property.

| `.env.local` variable name  | Firebase Config Property |
| --------------------------- | ------------------------ |
| REACT_APP_API_KEY           | apiKey                   |
| REACT_APP_AUTH_DOMAIN       | authDomain               |
| REACT_APP_DATABASE_URL      | databaseURL              |
| REACT_APP_PROJECT_ID        | projectId                |
| REACT_APP_STORAGE_BUCKET    | storageBucket            |
| REACT_APP_MESSAGE_SENDER_ID | messagingSenderId        |

So if the value of the `projectId` in your Firebase Config is `upswyng-local`, set your `REACT_APP_PROJECT_ID` in your `.env.local` like below.

```
REACT_APP_PROJECT_ID=upswyng-local
```

3. Once you've updated all variables, you'll to start/restart the application (see commands below).

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
