export const COMMUNITY_KEY = "Community";

class Community {
    name: string;
    description: string;
    members: number;
    constructor(name: string, description: string, members: number) {
        this.name = name;
        this.description = description;
        this.members = members;
    }
}

export const communityConverter = {
    // We shouldn't use this function, because we don't want to create a new community via the app
    toFirestore: (c: Community) => {
        return {
            name: c.name,
            description: c.description,
            members: c.members,
        };
    },
    fromFirestore: (snapshot: any) => {
        const data = snapshot.data();
        return new Community(data.name, data.description, data.members);
    }
};

export default Community;