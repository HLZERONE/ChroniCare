import {
	getDocs,
	collection,
	doc,
	getDoc,
	setDoc,
	query,
	addDoc,
	runTransaction,
} from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { postConverter, Post, POST_KEY } from "./data/Post";
import Community, { COMMUNITY_KEY, communityConverter } from "./data/Community";
import Reply, { REPLY_KEY, replyConverter } from "./data/Reply";
import { User, regularUser, regularUserConverter } from "./data/User";
import UserEngagement from "./data/UserEngagement";

// TODO: Should implement these functions in the future
//  - getJoinedCommunitiesByUser
//  - getTrendingCommunities

export const getCommunities = async () => {
	const q = query(collection(FIREBASE_DB, COMMUNITY_KEY)).withConverter(
		communityConverter
	);
	try {
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
	} catch (e) {
		console.log("getCommunities error: " + e);
		throw e;
	}
};

export const getPost = async (
	communityId: string,
	postId: string
): Promise<Post> => {
	const postRef = doc(
		FIREBASE_DB,
		COMMUNITY_KEY,
		communityId,
		POST_KEY,
		postId
	);
	try {
		const postDoc = await getDoc(postRef);
		if (postDoc.exists()) {
			return new Post(
				postDoc.id,
				postDoc.data().title,
				postDoc.data().content,
				postDoc.data().user,
				postDoc.data().replyCount,
				UserEngagement.fromFirestore(postDoc.data().userEngagement)
			);
		} else {
			throw new Error("Post not found");
		}
	} catch (e) {
		console.log("getPost error: " + e);
		throw e;
	}
};

export const getPosts = async (communityId: string) => {
	const communityRef = doc(FIREBASE_DB, COMMUNITY_KEY, communityId);
	const q = query(collection(communityRef, "posts")).withConverter(
		postConverter
	);
	try {
		const querySnapshot = await getDocs(q);
		let posts: Array<Post> = [];
		querySnapshot.forEach((doc: any) => {
			posts.push(
				new Post(
					doc.id,
					doc.data().title,
					doc.data().content,
					doc.data().user,
					doc.data().replyCount,
					UserEngagement.fromFirestore(doc.data().userEngagement)
				)
			);
		});
		return posts;
	} catch (e) {
		console.log("getPosts error: " + e);
		throw e;
	}
};

export const getReplies = async (
	communityId: string,
	postId: string
): Promise<Reply[]> => {
	const postRef = doc(
		FIREBASE_DB,
		COMMUNITY_KEY,
		communityId,
		POST_KEY,
		postId
	);
	const q = query(collection(postRef, "replies")).withConverter(replyConverter);
	try {
		const querySnapshot = await getDocs(q);
		const replies: Array<Reply> = [];
		querySnapshot.forEach((doc: any) => {
			replies.push(
				new Reply(
					doc.id,
					doc.data().postId,
					doc.data().user,
					doc.data().content,
					UserEngagement.fromFirestore(doc.data().userEngagement)
				)
			);
		});
		return replies;
	} catch (e) {
		console.log("getReplies error: " + e);
		throw e;
	}
};

export const createPost = async (
	communityId: string,
	title: string,
	content: string,
	user: regularUser
) => {
	const communityRef = doc(FIREBASE_DB, COMMUNITY_KEY, communityId);
	await addDoc(collection(communityRef, "posts"), {
		title: title,
		content: content,
		user: regularUserConverter.toFirestore(user),
		upVotes: 0,
		downVotes: 0,
		userEngagement: new UserEngagement(),
	});
};

export const createReply = async (
	communityId: string,
	postId: string,
	content: string,
	user: regularUser
) => {
	const postRef = doc(
		FIREBASE_DB,
		COMMUNITY_KEY,
		communityId,
		POST_KEY,
		postId
	);
	const newReplyRef = collection(postRef, "replies");

	// Start a Firestore transaction to ensure atomicity
	return await runTransaction(FIREBASE_DB, async (transaction) => {
		// Add the new reply
		const newReplyDocRef = await addDoc(newReplyRef, {
			postId: postId,
			user: regularUserConverter.toFirestore(user),
			content: content,
			upVotes: 0,
			downVotes: 0,
			userEngagement: new UserEngagement(),
		});

		// Get the current post document
		const postDoc = await transaction.get(postRef);
		if (!postDoc.exists()) {
			throw "Post does not exist!";
		}

		// Increment the replyCount in the post document
		const currentReplyCount = postDoc.data().replyCount || 0;
		transaction.update(postRef, { replyCount: currentReplyCount + 1 });

		// Return the newly created reply object
		return new Reply(
			newReplyDocRef.id,
			postId,
			user,
			content,
			new UserEngagement()
		);
	});
};

export const upvoteDownvotePost = async (communityId: string, post: Post) => {
	const postRef = doc(
		FIREBASE_DB,
		COMMUNITY_KEY,
		communityId,
		POST_KEY,
		post.id
	);
	await runTransaction(FIREBASE_DB, async (transaction) => {
		const postDoc = await transaction.get(postRef);
		if (!postDoc.exists()) {
			throw "Post does not exist!";
		}

		// Update the user engagement
		const userEngagement = postDoc.data().userEngagement
			? post.userEngagement.toFirestore()
			: new UserEngagement();
		transaction.update(postRef, { userEngagement: userEngagement });
	});
};

export const upvoteDownvoteReply = async (
	communityId: string,
	postId: string,
	reply: Reply
) => {
	const replyRef = doc(
		FIREBASE_DB,
		COMMUNITY_KEY,
		communityId,
		POST_KEY,
		postId,
		REPLY_KEY,
		reply.id
	);
	await runTransaction(FIREBASE_DB, async (transaction) => {
		const replyDoc = await transaction.get(replyRef);
		if (!replyDoc.exists()) {
			throw "Reply does not exist!";
		}

		// Update the user engagement
		const userEngagement = replyDoc.data().userEngagement
			? reply.userEngagement.toFirestore()
			: new UserEngagement();
		transaction.update(replyRef, { userEngagement: userEngagement });
	});
};
