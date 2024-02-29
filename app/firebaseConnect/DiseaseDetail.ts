import { getDocs, collection, doc, getDoc, setDoc, query} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { DISEASE_KEY, diseaseConverter, Disease } from "./data/Disease";

/*
FUNCTION: Add/Update new disease information to cloud
INPUT: name of disease(key) and its description
*/
export const setDiseaseInfo = async(name: any, description: String) => {
    const diseaseRef = doc(FIREBASE_DB, DISEASE_KEY, name).withConverter(diseaseConverter);
    await setDoc(diseaseRef, new Disease(name, description));
}

/*
FUNCTION: get disease info by its name
INPUT: disease name
RETURN: Promise<Disease>
ATTENTION: May throw an error if the disease name does not exist
*/
export const getDiseaseInfo = async(name: any) =>{
    const ref = doc(FIREBASE_DB, DISEASE_KEY, name).withConverter(diseaseConverter);
    try{
        const snap = await getDoc(ref);
        if(snap.exists()){
            const disease = snap.data();
            console.log(disease.toString());
            return disease;
        }else{
            throw("No such document!");
        }
    }catch(e){
        console.log("getDiseaseInfo error: "+e);
        throw e;
    }

}

/*
FUNCTION: get all disease info
RETURN: Array<Disease>
*/
export const getAllDiseaseInfo = async() =>{
    const q = query(collection(FIREBASE_DB, DISEASE_KEY)).withConverter(diseaseConverter);
    try{
        const querySnapshot = await getDocs(q);
        let diseases: Array<Disease> = [];
        querySnapshot.forEach((doc : any) => {
            diseases.push(doc.data());
        });
        return diseases;
    }catch(e){
        console.log("getAllDiseaseInfo error: "+e);
        throw e;
    }
}

