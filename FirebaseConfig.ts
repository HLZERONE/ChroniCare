// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

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
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

export const SignIn = async (email:any, password:any) => {
  try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
  } catch (error: any) {
      console.log(error);
  }
}


export const SignUp = async (email:any, password:any) => {
  try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
  } catch (error: any) {
      console.log(error);
  }
}

export const signOut = () =>{
  FIREBASE_AUTH.signOut();
}



