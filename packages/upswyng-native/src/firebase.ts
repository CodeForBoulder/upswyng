// Import the Firebase modules that you need in your app.
import firebase from "firebase";
import { firebaseConfig as config } from "../config";

export default firebase.initializeApp(config);
