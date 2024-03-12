import { User, regularUser } from "./User";
import UserEngagement from "./UserEngagement";

export const REPLY_KEY = "replies";

class Reply {
    id: string;
    postId: string;
    user: regularUser;
    content: string;
    userEngagement: UserEngagement = new UserEngagement();
    
    upvote(userId: string) {
        this.userEngagement.upVote(userId);
    }

    downvote(userId: string) {
        this.userEngagement.downVote(userId);
    }

    constructor(id: string, postId: string, user: regularUser, content: string, userEngagement: UserEngagement) {
        this.id = id;
        this.postId = postId;
        this.user = user;
        this.content = content;
        this.userEngagement = userEngagement;
    }
}

export const replyConverter = {
    toFirestore: (r: Reply) => {
        return {
            postId: r.postId,
            user: r.user,
            content: r.content,
            userEngagement: r.userEngagement
        };
    },
    fromFirestore: (snapshot: any, options: any): Reply => {
        const data = snapshot.data(options);
        return new Reply(data.id, data.postId, data.user, data.content, data.userEngagement);
    }
}

export default Reply;
