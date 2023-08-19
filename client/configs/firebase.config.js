import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5G7BhU-qfqB0ezpqZMRZXh3kQp37OF3U",
  authDomain: "rn-chat-application.firebaseapp.com",
  projectId: "rn-chat-application",
  storageBucket: "rn-chat-application.appspot.com",
  messagingSenderId: "86855353195",
  appId: "1:86855353195:web:6c7c522bd33e8a6dd9022e",
};

const app = getApps.lenght > 0 ? getApp() : initializeApp(firebaseConfig);

const firebaseAuth = getAuth(app);
const firestoreDB = getFirestore(app);

export { app, firebaseAuth, firestoreDB };
