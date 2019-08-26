# Upswyng (native)

Upswyng is a digital directory that contains information on local services and providers who serve the homeless community in the Boulder area.

## Setup

The initial project structure was generated using the [Create React Native App](https://facebook.github.io/react-native/blog/2017/03/13/introducing-create-react-native-app) and is powered by [Expo](https://expo.io/).

### Create `config.ts` file

To use the local development database, you'll only need to create a copy of `config.example.ts` and name that copy `config.ts`.

You can do this via your system's file explorer or via the following terminal command while in the repo:

```
cp config.example.ts config.ts
```

### Google API Key Configuration

You will need an API key for Google Maps JavaScript API/Directions API.
Get started here: [https://cloud.google.com/maps-platform/](https://cloud.google.com/maps-platform/)

Click `Get Started`, select `Maps` and `Routes` and proceed with the setup.

You will be presented with your key, which you will then need to save to your Upswyng directory's `config.ts` as `REACT_APP_GOOGLE_MAPS_API_KEY: yourUniqueGoogleAPIKeyHere`

### Firebase DB Setup (Optional)

If you want to work with your own copy of the database, you'll need to setup your own Firebase project. Below are the steps for setting one up.

**NOTE: THESE ARE OPTIONAL STEPS.**

#### Create a Firebase Project

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
3. In your terminal while in the repo, run `npm run datapipe`. This should create a new file called `data_pipeline/all.json`.
4. In top, right of the main panel displaying your data, find and open the kebab menu icon (3 stacked dots). In that menu, select **"Import JSON"**.
5. Upload the `data_pipeline/all.json` found in this repo.
6. Click the **"Import"** button.

🎉 You should now see your database populated! 🎉

#### Add an App to Your Firebase Project

1. Return to the **"Project Overview"** page in your Firebase project in your [Firebase Console](https://console.firebase.google.com/)
2. In the "Get started by adding Firebase to your app" section of the page, find and select the **"Web"** button, which looks like a self-closed HTML element **</>**.
3. Give your app a nickname, such as (but not required to be) `upswyng-local`
4. Click **"Register App"** button

A new screen should display scripts to be added to a project. Go ahead keep this page open, ignore the instructions given in Firebase, and move on to the next section of this README.

#### Update config.ts Variables

After completely setting up your Firebase project and registering your app (above), you'll need to setup some local environment variables to ensure the source compiles correctly.

1. Create a copy of the `config.example.ts` in this repo named `config.ts`
2. In your newly created `config.ts` you'll want to update the value of each of the placeholder variables. Each variable corresponds with your Firebase configuration (see previous section). Below details which variable values match your Firebase configuration property.

| `config.ts` variable name            | Firebase Config Property |
| ------------------------------------ | ------------------------ |
| REACT_APP_FIREBASE_API_KEY           | apiKey                   |
| REACT_APP_FIREBASE_AUTH_DOMAIN       | authDomain               |
| REACT_APP_FIREBASE_DATABASE_URL      | databaseURL              |
| REACT_APP_FIREBASE_PROJECT_ID        | projectId                |
| REACT_APP_FIREBASE_STORAGE_BUCKET    | storageBucket            |
| REACT_APP_FIREBASE_MESSAGE_SENDER_ID | messagingSenderId        |

So if the value of the `projectId` in your Firebase Config is `upswyng-local`, set your `REACT_APP_FIREBASE_PROJECT_ID` in your `config.ts` like below.

```
{
    ...
    REACT_APP_FIREBASE_PROJECT_ID: upswyng-local
    ...
}
```

3. Once you've updated all variables, you'll need to download an iOS emulator or Android emulator. See the [React Native Getting Started Guide](https://facebook.github.io/react-native/docs/getting-started.html) for more information. Then continue below.

## Commands

### `npm i`

Installs project dependencies.

### `npm start`

Starts Expo and will allow your virtual device to run Upswyng.

## Contributing

### 1. Find an Issue Pending Development, Needing Help, or Asking a Question

Want to develop? All issues that have been approved for development, but have not been started will be labelled as **Status: Pending**.

We'd love your input on possible new features. Some issues aren't ready for development and won't have a status label. These issues may need more input before being approved and instead be labelled **Type: Help Wanted**.

Maybe you have the answer to someone's question. Look through any issues labelled with **Type: Help Wanted** and comment with your answer.

### 2. Work on an Issue

Once you have have found an issue you feel comfortable working on, request to work on the issue and we'll label the issue as **Status: In Progress** to make sure others don't work on it as well.

Then, create a new branch off the current `master`.

### 3. Create a Pull Request (PR)

Once you believe your feature is ready for production, create a PR and reference what issue this addresses in the PR's description.

If there any updates requested, please make those updates on your local branch and re-push that branch to the repository.

If approved, project managers will handle merging and deploying.
