// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXzhqrppOvBEa9k1rs_5VxOG2vEIjAjgk",
  authDomain: "chronicare-82eed.firebaseapp.com",
  projectId: "chronicare-82eed",
  storageBucket: "chronicare-82eed.appspot.com",
  messagingSenderId: "64219666988",
  appId: "1:64219666988:web:d7046b264167fe0c1d8f89",
  measurementId: "G-L1PZ7S3005"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const analytics = getAnalytics(FIREBASE_APP);