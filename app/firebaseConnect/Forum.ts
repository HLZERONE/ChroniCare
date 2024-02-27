import { getDocs, collection, doc, getDoc, setDoc, query, addDoc} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { postConverter, Post } from "./data/Post";
import { COMMUNITY_KEY, communityConverter } from "./data/Community";
import Reply, { replyConverter } from "./data/Reply";

// TODO: Should implement these functions in the future
//  - getJoinedCommunitiesByUser
//  - getTrendingCommunities

export const getCommunities = async() => {
    const q = query(collection(FIREBASE_DB, COMMUNITY_KEY)).withConverter(communityConverter);
    try{
        const querySnapshot = await getDocs(q);
        let communities: Array<any> = [];
        querySnapshot.forEach((doc : any) => {
            communities.push(doc.data());
        });
        return communities;
    }catch(e){
        console.log("getCommunities error: "+e);
        throw e;
    }
}

export const getPosts = async(communityId: string) => {
    const communityRef = doc(FIREBASE_DB, COMMUNITY_KEY, communityId);
    const q = query(collection(communityRef, "posts")).withConverter(postConverter);
    try{
        const querySnapshot = await getDocs(q);
        let posts: Array<Post> = [];
        querySnapshot.forEach((doc : any) => {
            posts.push(doc.data());
        });
        return posts;
    }catch(e){
        console.log("getPosts error: "+e);
        throw e;
    };
}

export const getReplies = async(postId: string) => {
    const postRef = doc(FIREBASE_DB, postId);
    const q = query(collection(postRef, "replies")).withConverter(replyConverter);
    try{
        const querySnapshot = await getDocs(q);
        let replies: Array<Reply> = [];
        querySnapshot.forEach((doc : any) => {
            replies.push(doc.data());
        });
        return replies;
    }catch(e){
        console.log("getReplies error: "+e);
        throw e;
    };
}

export const createPost = async(communityId: string, title: string, content: string, user: any) => {
    const communityRef = doc(FIREBASE_DB, COMMUNITY_KEY, communityId);
    await addDoc(collection(communityRef, "posts"), new Post(title, content, user, 0, 0));
}

export const createReply = async(postId: string, content: string, user: any) => {
    const postRef = doc(FIREBASE_DB, postId);
    await addDoc(collection(postRef, "replies"), new Reply(postId, user, content, 0, 0));
}

