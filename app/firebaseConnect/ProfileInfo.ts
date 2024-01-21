import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { USER_KEY } from "./data/User";

/*
FUNCTIONl add new user information to cloud
INPUT: user id, first name, last name, address, zip code
*/
export const addUserInfo = async(id: any, _email: String, _firstName: String, _lastName: String, _address: String, _zip: String) => {
    const newUserInfo = {
        email : _email,
        firstName : _firstName,
        lastName : _lastName,
        address : _address,
        zip : _zip
    };
    await setDoc(doc(FIREBASE_DB, USER_KEY, id), newUserInfo);
}