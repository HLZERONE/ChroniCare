export interface User{
    email : String;
    firstName: String;
    lastName : String;
}

export interface RegularUser extends User{
    address: String;
    zip: String;
}

//User Info doc's NAME in FireStorage
export const USER_KEY = "UserInfo";