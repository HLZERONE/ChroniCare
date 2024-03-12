
//Disease doc's NAME in FireStorage
export const DISEASE_KEY = "Disease";

export class Disease {
    name: String;
    description: String;
    constructor(_name: String, _description: String){
        this.name = _name;
        this.description = _description;
    }
    
    toString() {
        return this.name + ': ' + this.description;
    }
}

export const diseaseConverter = {
    toFirestore: (d: Disease) => {
        return {
            name: d.name,
            description: d.description
        };
    },
    fromFirestore: (snapshot: any, id: any) => {
        const data = snapshot.data(id);
        return new Disease(data.name, data.description);
    }
}