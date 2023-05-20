import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "<SENSITIVE INFORMATION>",
  authDomain: "<SENSITIVE INFORMATION>",
  databaseURL: "<SENSITIVE INFORMATION>",
  projectId: "<SENSITIVE INFORMATION>",
  storageBucket: "<SENSITIVE INFORMATION>",
  messagingSenderId: "<SENSITIVE INFORMATION>",
  appId: "<SENSITIVE INFORMATION>",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
