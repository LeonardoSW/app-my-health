import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import {initializeFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCkV65SmBHfCzvLBiQMrmirMfIluqjvHLw",
  authDomain: "medicalcontrollermobile.firebaseapp.com",
  projectId: "medicalcontrollermobile",
  storageBucket: "medicalcontrollermobile.appspot.com",
  messagingSenderId: "540533088049",
  appId: "1:540533088049:web:95faa8cd57a577f5fa5a10"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const db = initializeFirestore(app, {experimentalForceLongPolling: true})

export {app, db}