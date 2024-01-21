import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { RegularUser, USER_KEY } from "./data/User";

/*
FUNCTION: add new user information to cloud
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

/*
FUNCTION: get user info by id
INPUT: user id
ATTENCTION: May throw error if user id not exists
*/
export const getUserInfo = async(id: any) =>{
    const ref = doc(FIREBASE_DB, USER_KEY, id);
    const snap = await getDoc(ref);
    if(snap.exists()){
        const data = snap.data();
        const userInfo: RegularUser = {
            email: data.email,
            firstName: data.firstName,
            lastName : data.lastName,
            address: data.address,
            zip: data.zip
        };
        console.log("here: " + data);
        return userInfo;
    }else{
        throw("No such document!");
    }
}