class UserEngagement {
    upVotedUsers: Array<string>;
    downVotedUsers: Array<string>;

    constructor(upVotedUsers: Array<string> = new Array(), downVotedUsers: Array<string> = new Array()) {
        this.upVotedUsers = upVotedUsers;
        this.downVotedUsers = downVotedUsers;
    }

    upVote(userId: string) {
        if (this.upVotedUsers.includes(userId)) {
            return;
        }
        this.upVotedUsers.push(userId);
        if (this.downVotedUsers.includes(userId)) {
            this.downVotedUsers = this.downVotedUsers.filter((id) => id !== userId);
        }
    }

    downVote(userId: string) {
        if (this.downVotedUsers.includes(userId)) {
            return;
        }
        this.downVotedUsers.push(userId);
        if (this.upVotedUsers.includes(userId)) {
            this.upVotedUsers = this.upVotedUsers.filter((id) => id !== userId);
        }
    }

    isUpVoted(userId: string) {
        return this.upVotedUsers.includes(userId);
    }

    isDownVoted(userId: string) {
        return this.downVotedUsers.includes(userId);
    }

    get weightedUpVotes() {
        return this.upVotedUsers.length - this.downVotedUsers.length;
    }

    get copy() {
        return new UserEngagement([...this.upVotedUsers], [...this.downVotedUsers]);
    }

    toFirestore() {
        return {
            upVotedUsers: this.upVotedUsers,
            downVotedUsers: this.downVotedUsers
        };
    }

    static fromFirestore(data: any) {
        return new UserEngagement(data?.upVotedUsers || [], data?.downVotedUsers || []);
    }
}

export default UserEngagement;