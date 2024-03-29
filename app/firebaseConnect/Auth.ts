import {FIREBASE_AUTH} from "../../FirebaseConfig"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {setUserInfo} from "./ProfileInfo";
import {curUserInfo} from "./CurrentUserInfo";

/*
Method:
1) SignIn(email, password) - Sign in user with the correct email and password
2) SignUp(email, password) - Sign up user
  - Check email format: need to be ...@..., if not, throw an error
  - Check password len: need to be longer than 6, if not, throw an 
3) SignOut() - Sign out user
  */

  export const SignIn = async (email: string, password: string) => {
    try {
        // Await the completion of the sign in process
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
    } catch (e) {
        console.error(e);
        throw e; // Rethrow the error to handle it outside or to indicate failure
    }
  };
  
  //TODO: add zip code and address input?
  export const SignUp = async (firstname: any, lastname: any, email:any, password:any, confirmPW: any, address: any = "", zip: any = "") => {
    if(email == null || !validateEmail(email)){
      throw("Invalisd Email Address");
    }else if(password == null || !validatePassword(password)){
      throw("Length of password have to be more than 6");
    }else if(firstname == null || lastname == null){
      throw("First name or last name cannot be empty");
    }else if(password != confirmPW){
      throw("confirm password needs to match password");
    }
    await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password).catch((e)=>{
      console.log(e);
      throw e;
    }).then((userCredential) => {
        const user = userCredential.user;
        curUserInfo.email = email;
        curUserInfo.firstName = firstname;
        curUserInfo.lastName = lastname;
        curUserInfo.address = address;
        curUserInfo.zip = zip;
        setUserInfo(user.uid, curUserInfo);
      });
  }
  
  export const SignOut = () =>{
    FIREBASE_AUTH.signOut();
  }

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

