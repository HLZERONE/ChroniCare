import { User, regularUser } from "./User";

export const REPLY_KEY = "Reply";

class Reply {
    id: string;
    postId: string;
    user: regularUser;
    content: string;
    upVotes: number;
    downVotes: number;

    constructor(id: string, postId: string, user: regularUser, content: string, upVotes: number, downVotes: number) {
        this.id = id;
        this.postId = postId;
        this.user = user;
        this.content = content;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
    }
}

export const replyConverter = {
    toFirestore: (r: Reply) => {
        return {
            postId: r.postId,
            user: r.user,
            content: r.content,
            upVotes: r.upVotes,
            downVotes: r.downVotes,
        };
    },
    fromFirestore: (snapshot: any, options: any): Reply => {
        const data = snapshot.data(options);
        return new Reply(data.id, data.postId, data.user, data.content, data.upVotes, data.downVotes);
    }
}

export default Reply;
