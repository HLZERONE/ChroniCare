import { RouteProp } from "@react-navigation/native";
import { Pressable, ScrollView, Text, View, StyleSheet, Dimensions} from "react-native";
import { CommunityStackNavList } from "./CommunityTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import CommunityModel from '../../firebaseConnect/data/Community';



type SearchResultNavigationProp = StackNavigationProp<CommunityStackNavList, 'SearchResult'>;
type SearchResultRouteProp = RouteProp<CommunityStackNavList, 'SearchResult'>;
var {height, width} = Dimensions.get('window');


type Props = {
    navigation: SearchResultNavigationProp;
    route: SearchResultRouteProp;
  };

const SearchResult = ({navigation, route}:Props)=>{
    const {communities} = route.params;

    return(
        <View style={styles.container}>
            <ScrollView>
                
                          {
            communities.map((community: CommunityModel, index: number) => {
              return (
                <Pressable key={index}  style={styles.tabContainer}>
                <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>{community.name}</Text>
                <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>{community.description}</Text>
    
                
                <View style={styles.bottomSpace}>
                    <Text style={styles.joinedNum}>{community.members} Members</Text>
                </View>
            </Pressable>              );
            })
          }
          <Pressable key={1}  style={styles.tabContainer}>
    <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>Hot Topics Hub</Text>
    <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>Discover the latest in hot topics and trends across the globe.</Text>
    <View style={styles.bottomSpace}>
        <Text style={styles.joinedNum}>{Math.floor(Math.random() * 10000)} Members</Text>
    </View>
</Pressable>

<Pressable key={2}  style={styles.tabContainer}>
    <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>Hot Gadget Geeks</Text>
    <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>A community for enthusiasts of the latest and hottest gadgets.</Text>
    <View style={styles.bottomSpace}>
        <Text style={styles.joinedNum}>{Math.floor(Math.random() * 10000)} Members</Text>
    </View>
</Pressable>

<Pressable key={3}  style={styles.tabContainer}>
    <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>Hot Cuisine Circle</Text>
    <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>Explore hot and spicy cuisines from around the world with fellow foodies.</Text>
    <View style={styles.bottomSpace}>
        <Text style={styles.joinedNum}>{Math.floor(Math.random() * 10000)} Members</Text>
    </View>
</Pressable>

<Pressable key={4}  style={styles.tabContainer}>
    <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>Hot Fitness Trends</Text>
    <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>Join us to discuss the hottest fitness trends and tips for a healthier lifestyle.</Text>
    <View style={styles.bottomSpace}>
        <Text style={styles.joinedNum}>{Math.floor(Math.random() * 10000)} Members</Text>
    </View>
</Pressable>

<Pressable key={5}  style={styles.tabContainer}>
    <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>Hot Music Beats</Text>
    <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>Everything about the hottest music tracks and artists right now.</Text>
    <View style={styles.bottomSpace}>
        <Text style={styles.joinedNum}>{Math.floor(Math.random() * 10000)} Members</Text>
    </View>
</Pressable>

<Pressable key={6}  style={styles.tabContainer}>
    <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>Hot Reads Club</Text>
    <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>Dive into the world of hot reads and discover your next favorite book.</Text>
    <View style={styles.bottomSpace}>
        <Text style={styles.joinedNum}>{Math.floor(Math.random() * 10000)} Members</Text>
    </View>
</Pressable>

<Pressable key={7}  style={styles.tabContainer}>
    <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>Hot Travel Destinations</Text>
    <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>Share and discover hot travel destinations and tips from fellow adventurers.</Text>
    <View style={styles.bottomSpace}>
        <Text style={styles.joinedNum}>{Math.floor(Math.random() * 10000)} Members</Text>
    </View>
</Pressable>
            </ScrollView>
        </View>

    )
}

export default SearchResult;

const styles = StyleSheet.create({
    container: {
        width: '100%',
    
        position: 'relative',
        backgroundColor: 'rgba(117, 196, 205, 0.19)',
        alignItems: 'center',
        justifyContent:'center'
      },
    tabContainer:{
        flex:1,
        backgroundColor: "#fff",
        borderRadius:16,
        width:width*0.9,
        marginHorizontal:3,
        paddingHorizontal:"5%",
        marginVertical:"2%"
    },
    tabTitle:{
        color: "#091F44", 
        justifyContent: 'flex-start', 
        textAlign: 'left', 
        fontWeight: '500',
        fontSize: 14,
    },
    tabTexts: {
        color: "#091F44", 
        fontSize: 12,
        fontWeight: '400',
    },
    bottomSpace:{
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingHorizontal:3,
        alignItems:'center'
    },
    joinedNum:{
        fontSize:10,
        color: 'rgba(0, 0, 0, 0.5)',
        marginLeft:2
    },
})