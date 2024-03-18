import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { regularUser, USER_KEY, regularUserConverter} from "./data/User";
import {currentUser, curUserInfo} from "./CurrentUserInfo";
import { updatePassword } from "firebase/auth";

/*
FUNCTION: add new user information to cloud
INPUT: user id, first name, last name, address, zip code
*/
export const addUserInfo = async(id: any, email: String, firstName: String, lastName: String, address: String, zip: String) => {
    const ref = doc(FIREBASE_DB, USER_KEY, id).withConverter(regularUserConverter);
    await setDoc(ref, new regularUser(email, firstName, lastName, address, zip, []));
}



/*
FUNCTION: add or update user Info
INPUT: userId, regularUser Object
*/
export const setUserInfo = async (id: any, rU: regularUser) =>{
    const ref = doc(FIREBASE_DB, USER_KEY, id).withConverter(regularUserConverter).withConverter(regularUserConverter);
    await setDoc(ref, rU);
}

/*
FUNCTION: update current user's password
INPUT: new password
*/
export const setUserPassword = (newPassword: any) =>{
    if(currentUser){
        updatePassword(currentUser, newPassword).then(() => {
            console.log("Successfully Updated Password to " + newPassword);
          }).catch((error) => {
            console.log("Have error on setting user password " + error);
        });
    }
}

/*
FUNCTION: add a new disease to current login user
INPUT: disease Name
WARNING: As all diseases have been predefined, a disease must exist in the database, 
and users should be limited in their choice of disease types.(Using Button)
*/
export const addNewDiseaseToCurUser = async(diseaseName: String) =>{
    if(currentUser != null){
        curUserInfo.addNewDisease(diseaseName);
        setUserInfo(currentUser.uid, curUserInfo);
    }else{
        throw("No user login");
    }
}