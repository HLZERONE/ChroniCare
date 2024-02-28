export const COMMUNITY_KEY = "Community";

class Community {
    id: string;
    name: string;
    description: string;
    members: number;
    constructor(id: string, name: string, description: string, members: number) {
        this.id = id;
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
        return new Community(data.id, data.name, data.description, data.members);
    }
};

export default Community;