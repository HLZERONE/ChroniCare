import {Provider} from './data/Provider'
import {Location} from './data/Location'

// Mock data for names, specializations, and a function to generate random rates and locations
//NAME
const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson"];
const generateRandomName = () => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return `${firstName} ${lastName}`;
}
//SPECIALIZATION
const specializations = ['Psychiatrists', 'General Practice', 'Cardiology', 'Gastroenterology', 'Oncologist', 
    'Nephrology', 'Endocrinologists', 'Obstetrics and gynaecology', 'Pathology', 'Internal medicine'];
const generateRandomSpecialization = () =>{
    return specializations[Math.floor(Math.random() * specializations.length)];
}
//RATE
const generateRandomRate = () => Math.floor(Math.random() * 100) + 50;
//LOCATION
const generateRandomLocationWithinRadius = (latitude: number, longitude: number, radiusInMiles: number): Location => {
    const radiusInDegrees = radiusInMiles / 69;
    const longitudeRadius = radiusInDegrees / Math.cos(latitude * Math.PI / 180);
    const randomLatitude = latitude + (Math.random() * 2 - 1) * radiusInDegrees;
    const randomLongitude = longitude + (Math.random() * 2 - 1) * longitudeRadius;
    return new Location(randomLatitude, randomLongitude);
};

// Function to generate a list of random providers
export const generateRandomProviders = (latitude: number, longitude: number, radius: number, count: number): Provider[] =>{
    const providers: Provider[] = [];
    for (let i = 0; i < count; i++) {
        const name = generateRandomName();
        const specialization = generateRandomSpecialization();
        const location = generateRandomLocationWithinRadius(latitude, longitude, radius);
        const rate = generateRandomRate();
        providers.push(new Provider(name, specialization, location, rate));
    }
    return providers;
}
