import { collection, query, orderBy, startAt, endAt, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from "../../FirebaseConfig";


// Assuming FIREBASE_DB is your Firestore database instance
export const search = async (searchKey: string) => {
  // Define the collection you want to search
  const usersRef = collection(FIREBASE_DB, 'UserInfo');

  // Construct the query
  const q = query(
    usersRef
  );

  // Execute the query
  const querySnapshot = await getDocs(q);

  // Process the query results
  const users = querySnapshot.docs
  .map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
    console.log(users);
  return users;
};
