import Reply from "./Reply";
import { User } from "./User";
import UserEngagement from "./UserEngagement";

export const POST_KEY = "posts";

export class Post {
    id: string;
    title: string;
    content: string;
    user: User;
    replyCount: number = 0;
    userEngagement: UserEngagement = new UserEngagement();

    upvote(userId: string) {
        this.userEngagement.upVote(userId);
    }

    downvote(userId: string) {
        this.userEngagement.downVote(userId);
    }
    
    constructor(id: string, title: string, content: string, user: User,  replyCount: number = 0, userEngagement: UserEngagement = new UserEngagement()){
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
        this.replyCount = replyCount;
        this.userEngagement = userEngagement;
    }
    
    toString() {
        return this.title + ': ' + this.content;
    }
}

export const postConverter = {
    toFirestore: (p: Post) => {
        {
        return {
            title: p.title,
            content: p.content,
            user: p.user,
            userEngagement: p.userEngagement
            };
        };
    },
    fromFirestore: (snapshot: any, options: any): Post => {
        const data = snapshot.data(options);
        return new Post(data.id, data.title, data.content, data.user, data.upVotes, data.userEngagement);
    }
}