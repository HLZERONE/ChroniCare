import React, {useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, ScrollView, Animated, Platform} from 'react-native';
import * as Place from 'expo-location';
import { generateRandomProviders } from '../../firebaseConnect/ProviderGenerator';
import { Provider } from '../../firebaseConnect/data/Provider';
import { Location } from '../../firebaseConnect/data/Location';
import {StarRating} from '../../components/StarRating'


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 80;
const CARD_WIDTH = width * 0.6;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const FindDoctor = () => {
    const [userlocation, setLocation] = useState<Location>(new Location(33.6405407712, -117.838914978));
    const [errorMsg, setErrorMsg] = useState(String);
    const [providerList, setProviderList] = useState<Provider[]>([]);
    
    const _map = React.useRef<MapView | null>(null);
    let mapIndex = 0;
    let mapAnimation = new Animated.Value(0);
    const mapListener = (value: any) => {
        let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
        if (index >= providerList.length) {
          index = providerList.length - 1;
        }
        if (index <= 0) {
          index = 0;
        }
        //clearTimeout(regionTimeout);
        const regionTimeout = setTimeout(() => {
          if( _map.current && index && mapIndex !== index ) {
            mapIndex = index;
            
            const curPos = providerList[index].location;
            _map.current.animateToRegion(
              curPos,
              350
            );
          }
        }, 10);
        
      };

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
        //mapAnimation.addListener(mapListener);
    },[]);

    return (
        <View style={styles.container}>  
            {errorMsg && <Text>{errorMsg}</Text>}
            <MapView  style={styles.map} region={userlocation}>
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
            
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                style={styles.scrollView}
                contentInset={{
                    top: 0,
                    left: SPACING_FOR_CARD_INSET,
                    bottom: 0,
                    right: SPACING_FOR_CARD_INSET
                }}
                contentContainerStyle={{
                    paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
                }}
                onScroll={Animated.event(
                    [
                      {
                        nativeEvent: {
                          contentOffset: {
                            x: mapAnimation,
                          }
                        },
                      },
                    ],
                    {useNativeDriver: true}
                )}
            >
                {providerList.map((provider, index) =>(
                        <View style={styles.card} key={index}>
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardtitle}>{provider.name}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>{provider.specialization}</Text>
                                <StarRating ratings={Math.ceil(provider.rate)} rateNum={provider.rate} />
                            </View>
                        </View>
                ))}
            </Animated.ScrollView>
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
    card: {
        // padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
});


export default FindDoctor;