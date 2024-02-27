import { User } from "./User";

export const POST_KEY = "Post";

export class Post {
    title: String;
    content: String;
    user: User;
    upVotes: number = 0;
    downVotes: number = 0;
    constructor(_title: String, _content: String, _user: User, _upVotes: number, _downVotes: number){
        this.title = _title;
        this.content = _content;
        this.user = _user;
        this.upVotes = _upVotes;
        this.downVotes = _downVotes;
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
            upVotes: p.upVotes,
            downVotes: p.downVotes,
            };
        };
    },
    fromFirestore: (snapshot: any, options: any): Post => {
        const data = snapshot.data(options);
        return new Post(data.title, data.content, data.user, data.upVotes, data.downVotes);
    }
}