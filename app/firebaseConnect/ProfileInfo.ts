import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { regularUser, USER_KEY, regularUserConverter} from "./data/User";



/*
FUNCTION: get user info by id
INPUT: user id
RETURN: Promise<regularUser>
ATTENCTION: May throw error if user id not exists
*/
export const getUserInfo = async(id: any) =>{
    const ref = doc(FIREBASE_DB, USER_KEY, id).withConverter(regularUserConverter);
    const snap = await getDoc(ref);
    if(snap.exists()){
        const user = snap.data();
        console.log(user.toString());
        return user;
    }else{
        throw("No such document!");
    }
}

/*
FUNCTION: add or update user Info
INPUT: userId, regularUser Object
*/
export const setUserInfo = async (id: any, rU: regularUser) =>{
    const ref = doc(FIREBASE_DB, USER_KEY, id).withConverter(regularUserConverter).withConverter(regularUserConverter);
    await setDoc(ref, rU);
}