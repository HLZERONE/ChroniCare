import { collection, query, orderBy, startAt, endAt, getDocs, where, or } from 'firebase/firestore';
import { FIREBASE_DB } from "../../FirebaseConfig";
import Community, { COMMUNITY_KEY, communityConverter } from "./data/Community";




export const search = async (searchKey: string) => {
  const ref = collection(FIREBASE_DB, COMMUNITY_KEY);

  // for now, the firebase native api only supports these kind of query, which makes it only returns if there is a exact match.
  // and now it only supports query communites as the native api does not support query subcollections.
  const q = query(
    ref,
    or(where("description", "==", searchKey),
    where("name", "==", searchKey)
    )

  ).withConverter(
		communityConverter
	);

  const querySnapshot = await getDocs(q);

  let communities: Array<Community> = [];
  querySnapshot.forEach((doc: any) => {
    communities.push({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description,
      members: doc.data().members,
    });
  });
  return communities;

};

