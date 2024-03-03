export class Location {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
    constructor(_latitude: number, _longitude: number, _latitudeDelta: number = 0.04, _longitudeDelta: number = 0.05){
        this.latitude = _latitude;
        this.longitude = _longitude;
        this.latitudeDelta = _latitudeDelta;
        this.longitudeDelta = _longitudeDelta;
    }

    updateLocation(_latitude: number, _longitude: number){
        this.latitude = _latitude;
        this.longitude = _longitude;
    }
    
    toString() {
        return this.latitude + ', ' + this.longitude;
    }
}