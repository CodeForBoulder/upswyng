import "./index.css";
import "./i18n";

import * as serviceWorker from "./serviceWorker";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom";
import { TEnvVariables } from "./webTypes";
import TagManager from "react-gtm-module";

declare const process: TEnvVariables;

const tagManagerArgs = {
  gtmId: process.env.REACT_APP_GOOGLE_TAG_MANAGER_CONTAINER_ID,
  auth: process.env.REACT_APP_GOOGLE_TAG_MANAGER_AUTH,
  preview: process.env.REACT_APP_GOOGLE_TAG_MANAGER_PREVIEW,
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
