import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Place from 'expo-location';
import { generateRandomProviders } from '../../firebaseConnect/ProviderGenerator';
import { Provider } from '../../firebaseConnect/data/Provider';
import { Location } from '../../firebaseConnect/data/Location';

const FindDoctor = () => {
    const [location, setLocation] = useState<Location>(new Location(33.6405407712, -117.838914978));
    const [errorMsg, setErrorMsg] = useState(String);
    const [providerList, setProviderList] = useState<Provider[]>([]);

    const userLocation = async () =>{
        let { status } = await Place.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        //Get User Location
        let location = await Place.getCurrentPositionAsync({accuracy: 3});
        setLocation(new Location(location.coords.latitude, location.coords.longitude));
        //Generate provider
        let providerList = generateRandomProviders(location.coords.latitude, location.coords.longitude, 2, 4);
        setProviderList(providerList);
    }


    useEffect(()=>{
        userLocation();
    },[]);

    return (
        <View style={styles.container}>
            {errorMsg && <Text>{errorMsg}</Text>}
            <MapView style={styles.map} region={location}>
                {providerList.map((provider, index) => (
                    <Marker
                        key={index}
                        coordinate={provider.location}
                        title={provider.name}
                        description={
                            provider.getInfo()
                        }
                    />
                ))}
                
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});


export default FindDoctor;