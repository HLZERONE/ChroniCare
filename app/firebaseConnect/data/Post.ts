import Reply from "./Reply";
import { User } from "./User";

export const POST_KEY = "Post";

export class Post {
    id: string;
    title: string;
    content: string;
    user: User;
    upVotes: number = 0;
    downVotes: number = 0;
    replies: Array<Reply> = [];
    constructor(_id: string, _title: string, _content: string, _user: User, _upVotes: number, _downVotes: number, _replies: Array<Reply> = []){
        this.id = _id;
        this.title = _title;
        this.content = _content;
        this.user = _user;
        this.upVotes = _upVotes;
        this.downVotes = _downVotes;
        this.replies = _replies;
    }
    
    public get replyCount(): number {
        return this.replies.length;
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
            replies: p.replies,
            upVotes: p.upVotes,
            downVotes: p.downVotes,
            };
        };
    },
    fromFirestore: (snapshot: any, options: any): Post => {
        const data = snapshot.data(options);
        return new Post(data.id, data.title, data.content, data.user, data.upVotes, data.downVotes, data.replies);
    }
}