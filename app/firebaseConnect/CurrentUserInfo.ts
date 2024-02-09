import {FIREBASE_AUTH} from "../../FirebaseConfig"
import {getUserInfo} from "./ProfileInfo";
import {regularUser } from "./data/User";


export const currentUser = FIREBASE_AUTH.currentUser;
export const curUserInfo: regularUser = new regularUser("","","","","", []);

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