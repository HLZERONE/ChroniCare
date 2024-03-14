import React, {useRef, useState, useEffect} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions, ScrollView, Animated, Platform} from 'react-native';
import * as Place from 'expo-location';
import { generateRandomProviders } from '../../firebaseConnect/ProviderGenerator';
import { Provider } from '../../firebaseConnect/data/Provider';
import { Location } from '../../firebaseConnect/data/Location';
import {StarRating} from '../../components/StarRating'


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 80;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;


const FindDoctor = () => {
    const [userlocation, setLocation] = useState<Location>(new Location(33.6405407712, -117.838914978));
    const [errorMsg, setErrorMsg] = useState(String);
    const [providerList, setProviderList] = useState<Provider[]>([]);
    
    const _map = React.useRef<MapView>(null);
    const _scrollView = React.useRef<ScrollView>(null);
    let mapIndex = 0;
    let mapAnimation = useRef(new Animated.Value(0)).current;

    const interpolations = providerList.map((provider, index) => {
        const inputRange = [
          (index - 1) * CARD_WIDTH,
          index * CARD_WIDTH,
          ((index + 1) * CARD_WIDTH),
        ];
    
        const scale = mapAnimation.interpolate({
          inputRange,
          outputRange: [1, 1.5, 1],
          extrapolate: "clamp"
        });
    
        return { scale };
    });

    const onMarkerPress = (mapEventData: any) => {
        const markerID = mapEventData._targetInst.return.key;
    
        let x = (markerID * CARD_WIDTH) + (markerID * 20); 
        if (Platform.OS === 'ios') {
          x = x - SPACING_FOR_CARD_INSET;
        }
        _scrollView.current?.scrollTo({x: x, y:0, animated: true});
    }

    const setUpPage = async () =>{
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
        //Set Map listener
        mapAnimation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3);
            if (index >= providerList.length) {
              index = providerList.length - 1;
            }
            if (index <= 0) {
              index = 0;
            }
            
            const regionTimeout = setTimeout(() => {
              if(mapIndex !== index ) {
                mapIndex = index;
                console.log(providerList[index].name);
                const curPos = providerList[index].location;
                _map.current?.animateToRegion(
                  curPos,
                  350
                );
              }
            }, 10);
        });
    }


    useEffect(()=>{
        setUpPage();
    },[]);

    return (
        <View style={styles.container}>  
            {errorMsg && <Text>{errorMsg}</Text>}
            <MapView ref={_map} style={styles.map} region={userlocation}>
                <Marker
                    coordinate={userlocation}
                    title={"My Location"}
                >
                    <Animated.View style={[styles.markerWrap]}>
                        <Animated.Image
                        source={require('../../../assets/my_location(1).png')}
                        style={styles.userMarker}
                        resizeMode="cover"
                        />
                    </Animated.View>
                </Marker>
                {providerList.map((provider, index) => {
                    const scaleStyle = {
                        transform: [
                          {
                            scale: interpolations[index].scale,
                          },
                        ],
                      };
                    
                    return (
                        <Marker
                            key={index}
                            coordinate={provider.location}
                            onPress={(e)=>onMarkerPress(e)}
                        >
                            <Animated.View style={[styles.markerWrap]}>
                                <Animated.Image
                                source={require('../../../assets/map_marker.png')}
                                style={[styles.marker, scaleStyle]}
                                resizeMode="cover"
                                />
                            </Animated.View>
                        </Marker>
                    );
                })}
            </MapView>
            
            <Animated.ScrollView
                ref={_scrollView}
                horizontal
                pagingEnabled
                scrollEventThrottle={1}
                showsHorizontalScrollIndicator={false}
                snapToInterval={CARD_WIDTH + 20}
                snapToAlignment="center"
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


                onScroll={(event) => {
                    const scrollX = event.nativeEvent.contentOffset.x;
                    mapAnimation.setValue(scrollX);
                }}
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
        flex:1,
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
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width:50,
        height:50,
      },
    marker: {
        width: 30,
        height: 30,
    },
    userMarker: {
        width: 40,
        height: 40,
    },
});


export default FindDoctor;