//User Info doc's NAME in FireStorage
export const USER_KEY = "UserInfo";

export class regularUser implements RegularUser{
    email: String;
    firstName: String;
    lastName: String;
    address: String = "";
    zip: String = "";
    diseases: String[] = [];
    constructor(email: String, firstName: String, lastName: String, address: String, zip: String, diseases: String[]){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.zip = zip;
        this.diseases = diseases;
    }

    addNewDisease(name : String){
        this.diseases.push(name);
    }
    
    getUserName() {
        return this.firstName + ' ' + this.lastName;
    }
}

export const regularUserConverter = {
    toFirestore: (rU: regularUser) => {
        return {
            email: rU.email,
            firstName: rU.firstName,
            lastName : rU.lastName,
            address: rU.address,
            zip: rU.zip,
            diseases: rU.diseases
        };
    },
    fromFirestore: (snapshot: any, id: any) => {
        const data = snapshot.data(id);
        return new regularUser(data.email, data.firstName, data.lastName, data.address, data.zip, data.diseases);
    }
}

interface User{
    email : String;
    firstName: String;
    lastName : String;
    diseases: String[];
}

interface RegularUser extends User{
    address: String;
    zip: String;
}