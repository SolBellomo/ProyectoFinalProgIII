
import app from "firebase/app";
import firebase from "firebase";


const firebaseConfig = {
    apiKey: "AIzaSyDpdNALfzJhGaj_vUFAT_ngWhSS0O6uphk",
    authDomain: "pruebanative-25fb0.firebaseapp.com",
    projectId: "pruebanative-25fb0",
    storageBucket: "pruebanative-25fb0.appspot.com",
    messagingSenderId: "401867610164",
    appId: "1:401867610164:web:b067c7afd4c0dc04ded261"
  };

  app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
