import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { regularUser, USER_KEY, regularUserConverter, curUserInfo} from "./data/User";
import { currentUser } from "./Auth";

/*
FUNCTION: add new user information to cloud
INPUT: user id, first name, last name, address, zip code
*/
export const addUserInfo = async(id: any, email: String, firstName: String, lastName: String, address: String, zip: String) => {
    const ref = doc(FIREBASE_DB, USER_KEY, id).withConverter(regularUserConverter);
    await setDoc(ref, new regularUser(email, firstName, lastName, address, zip, []));
}

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

/*
FUNCTION: add or update user Info
INPUT: userId, regularUser Object
*/
export const setUserInfo = async (id: any, rU: regularUser) =>{
    const ref = doc(FIREBASE_DB, USER_KEY, id).withConverter(regularUserConverter).withConverter(regularUserConverter);
    await setDoc(ref, rU);
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