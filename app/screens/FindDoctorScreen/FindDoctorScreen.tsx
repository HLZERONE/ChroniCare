import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import * as Place from 'expo-location';
import { Location } from '../../firebaseConnect/data/Location';

const FindDoctor = () => {
    
    const [location, setLocation] = useState<Location>(new Location(33.6405407712, -117.838914978));
    const [errorMsg, setErrorMsg] = useState(String);

    const userLocation = async () =>{
        let { status } = await Place.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Place.getCurrentPositionAsync({accuracy: 3});
        setLocation(new Location(location.coords.latitude, location.coords.longitude));
    }

    useEffect(()=>{
        userLocation();
    },[]);

    return (
        <View style={styles.container}>
        {errorMsg && <Text>{errorMsg}</Text>}
        <MapView style={styles.map} region = {location}>
            <Marker coordinate={location} title="Marker"></Marker>
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