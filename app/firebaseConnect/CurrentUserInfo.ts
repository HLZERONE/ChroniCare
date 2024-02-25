import { doc, getDoc } from "firebase/firestore";
import {FIREBASE_AUTH, FIREBASE_DB} from "../../FirebaseConfig"
import {USER_KEY, regularUser, regularUserConverter } from "./data/User";
import { onAuthStateChanged } from "firebase/auth";


export let currentUser = FIREBASE_AUTH.currentUser;
export const curUserInfo: regularUser = new regularUser("","","","","", []);


onAuthStateChanged(FIREBASE_AUTH, (user) => {
  if (user) {
    currentUser = user;
    addCurrentUserInfo();
  }
});

/*
FUNCTION: get user info by id
INPUT: user id
RETURN: Promise<regularUser>
ATTENCTION: May throw error if user id not exists
*/
export const getUserInfo = async(id: any) =>{
  const ref = doc(FIREBASE_DB, USER_KEY, id).withConverter(regularUserConverter);
  try{
      const snap = await getDoc(ref);
      if(snap.exists()){
          const user = snap.data();
          console.log(user.toString());
          return user;
      }else{
          throw("No such document!");
      }
  }catch(e){
      console.log("getUserInfo error: "+e);
      throw e;
  }

}

export const addCurrentUserInfo = async() => {
    if (!currentUser || !currentUser.uid) {
      throw new Error('Current user or UID is undefined');
    }
  
    try {
      const userInfo = await getUserInfo(currentUser.uid);
      if (!userInfo) {
        throw new Error('User info is undefined');
      }
  
      // Ensure userInfo has all required properties
      const { email, firstName, lastName, address, zip } = userInfo;
      if ([email, firstName, lastName, address, zip].some(prop => prop === undefined)) {
        throw new Error('One or more user info properties are undefined');
      }
  
      // Update curUserInfo state
      // Replace this with your state update logic if using React state
      curUserInfo.email = userInfo.email;
      curUserInfo.firstName = userInfo.firstName;
      curUserInfo.lastName = userInfo.lastName;
      curUserInfo.address = userInfo.address;
      curUserInfo.zip = userInfo.zip;
    } catch (error) {
      console.error('Error in addUserInfo:', error);
      throw error;
    }

  }