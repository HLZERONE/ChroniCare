

//User Info doc's NAME in FireStorage
export const USER_KEY = "UserInfo";

export class regularUser implements RegularUser{
    email: String;
    firstName: String;
    lastName: String;
    address: String;
    zip: String;
    constructor(email: String, firstName: String, lastName: String, address: String, zip: String){
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.zip = zip;
    }
    
    toString() {
        return this.email + ', ' + this.firstName + ', ' + this.lastName;
    }
}

export const regularUserConverter = {
    toFirestore: (rU: regularUser) => {
        return {
            email: rU.email,
            firstName: rU.firstName,
            lastName : rU.lastName,
            address: rU.address,
            zip: rU.zip
        };
    },
    fromFirestore: (snapshot: any, id: any) => {
        const data = snapshot.data(id);
        return new regularUser(data.email, data.firstName, data.lastName, data.address, data.zip);
    }
}

export const curUserInfo: regularUser = new regularUser("","","","","");

interface User{
    email : String;
    firstName: String;
    lastName : String;
}

interface RegularUser extends User{
    address: String;
    zip: String;
}