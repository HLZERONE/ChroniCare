// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

/*
Method:
1) SignIn(email, password) - Sign in user with the correct email and password
2) SignUp(email, password) - Sign up user
  - Check email format: need to be ...@..., if not, throw an error
  - Check password len: need to be longer than 6, if not, throw an 
3) SignOut() - Sign out user
*/

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

const validateEmail = (email: any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const validatePassword = (password: any) =>{
  return String(password).length >= 6;
}

export const SignIn = async (email:any, password:any) => {
  await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
}


export const SignUp = async (firstname: any, lastname: any, email:any, password:any, confirmPW: any) => {
  if(email == null || !validateEmail(email)){
    throw("Invalisd Email Address");
  }else if(password == null || !validatePassword(password)){
    throw("Length of password have to be more than 6");
  }else if(firstname == null || lastname == null){
    throw("First name or last name cannot be empty");
  }else if(password != confirmPW){
    throw("confirm password needs to match password");
  }
  await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
}

export const SignOut = () =>{
  FIREBASE_AUTH.signOut();
}




