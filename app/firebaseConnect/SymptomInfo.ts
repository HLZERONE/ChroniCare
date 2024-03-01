import { getDocs, collection, doc, addDoc, setDoc, query, where, writeBatch} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { SYMPTOM_KEY, Symptom, symptomConverter} from "./data/Symptom";
import { currentUser } from "./CurrentUserInfo";

/*
FUNCTION: Add new symptom information to cloud
INPUT: diseaseName, note in String format; severity, duration in numerical format, and the date for this symptom
OUTPUT: a Symptom class that contains these information with auto generate id
*/
export const addSymptomInfo = async(
    _diseaseName: string,
    _severity: number,
    _duration: number,
    _date: Date=new Date(),
    _notes: string="") => {
    //const symptomRef = doc(FIREBASE_DB, SYMPTOM_KEY, symptom.id).withConverter(symptomConverter);
    //await setDoc(symptomRef, symptom);

    const symptomRef = await addDoc(collection(FIREBASE_DB, SYMPTOM_KEY), {
        userId: currentUser?.uid,
        diseaseName: _diseaseName,
        notes: _notes,
        severity: _severity,
        duration: _duration,
        date: _date,
      });

    return new Symptom(symptomRef.id, currentUser?.uid, _diseaseName, _severity, _duration, _date, _notes);
}

/*
FUNCTION: Update symptom information to cloud
INPUT: the symptom object
*/
export const updateSymptomInfo = async(symptom: Symptom) => {
    const symptomRef = doc(FIREBASE_DB, SYMPTOM_KEY, symptom.id).withConverter(symptomConverter);
    await setDoc(symptomRef, symptom);
}

export const batchUpdateSymptomInfo = async (symptoms: Symptom[]) => {
    const batch = writeBatch(FIREBASE_DB); // Use writeBatch with the Firestore instance

    symptoms.forEach((symptom) => {
        const symptomRef = doc(FIREBASE_DB, SYMPTOM_KEY, symptom.id).withConverter(symptomConverter);
        batch.set(symptomRef, symptom);
    });

    await batch.commit();
}

/*
FUNCTION: get all symptom info that related to the provided userId
INPUT: UserId
RETURN: Array<Symptom>
*/
export const getAllSymptomInfoByUser = async(userId: any) =>{
    
    const q = query(collection(FIREBASE_DB, SYMPTOM_KEY), where("userId", "==", userId)).withConverter(symptomConverter);
    try{
        const querySnapshot = await getDocs(q);
        let symptoms: Array<Symptom> = [];
        querySnapshot.forEach((doc : any) => {
            symptoms.push(doc.data());
        });
        return symptoms;
    }catch(e){
        console.log("getAllSymptomInfoByUser error: "+e);
        throw e;
    }
}


/*
FUNCTION: get all symptom info related to the provided userId within the time range 
INPUT: UserId, startDate, endDate(optional, default is today)
RETURN: Array<Symptom>
*/
export const getSymptomByDateRange = async(userId: any, startDate: Date, endDate: Date = new Date()) =>{
    const q = query(collection(FIREBASE_DB, SYMPTOM_KEY)
    , where("userId", "==", userId)
    , where("date", ">=", startDate)
    , where("date", "<=", endDate)).withConverter(symptomConverter);
    try{
        const querySnapshot = await getDocs(q);
        let symptoms: Array<Symptom> = [];
        querySnapshot.forEach((doc : any) => {
            symptoms.push(doc.data());
        });
        return symptoms;
    }catch(e){
        console.log("getSymptomByDateRange error: " + e);
        throw e;
    }
}

