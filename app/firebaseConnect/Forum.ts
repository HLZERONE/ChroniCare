import { getDocs, collection, doc, getDoc, setDoc, query, addDoc} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { postConverter, Post } from "./data/Post";
import Community, { COMMUNITY_KEY, communityConverter } from "./data/Community";
import Reply, { replyConverter } from "./data/Reply";
import { User, regularUser, regularUserConverter } from "./data/User";

// TODO: Should implement these functions in the future
//  - getJoinedCommunitiesByUser
//  - getTrendingCommunities

export const getCommunities = async() => {
    const q = query(collection(FIREBASE_DB, COMMUNITY_KEY)).withConverter(communityConverter);
    try{
        const querySnapshot = await getDocs(q);
        let communities: Array<Community> = [];
        querySnapshot.forEach((doc : any) => {
            communities.push({
                id: doc.id,
                name: doc.data().name,
                description: doc.data().description,
                members: doc.data().members
            });
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
            posts.push({
                id: doc.id,
                title: doc.data().title,
                content: doc.data().content,
                user: doc.data().user,
                upVotes: doc.data().upVotes,
                downVotes: doc.data().downVotes,
                replies: doc.data().replies,
                replyCount: doc.data().replies.length
            })
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
            replies.push({
                id: doc.id,
                postId: doc.data().postId,
                user: doc.data().user,
                content: doc.data().content,
                upVotes: doc.data().upVotes,
                downVotes: doc.data().downVotes
            });
        });
        return replies;
    }catch(e){
        console.log("getReplies error: "+e);
        throw e;
    };
}

export const createPost = async(communityId: string, title: string, content: string, user: regularUser) => {
    const communityRef = doc(FIREBASE_DB, COMMUNITY_KEY, communityId);
    await addDoc(collection(communityRef, "posts"), {
        title: title,
        content: content,
        user: regularUserConverter.toFirestore(user),
        replies: [],
        upVotes: 0,
        downVotes: 0
    });
}

export const createReply = async(postId: string, content: string, user: regularUser) => {
    const postRef = doc(FIREBASE_DB, postId);
    await addDoc(collection(postRef, "replies"), {
        postId: postId,
        user: regularUserConverter.toFirestore(user),
        content: content,
        upVotes: 0,
        downVotes: 0
    });
}

