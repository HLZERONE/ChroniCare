import {Location} from './Location'
export class Provider {
    name: string;
    specialization: string;
    location: Location;
    rate: number;
    constructor(_name: string, _specialization: string, _location: Location, _rate: number){
        this.name = _name;
        this.specialization = _specialization;
        this.location = _location;
        this.rate = _rate;
    }

    getInfo(){
        return "Specialization: " + this.specialization + " Rate: " + this.rate;
    }
}