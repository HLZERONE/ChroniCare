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
                <Pressable key={index} onPress={()=>{navigation.navigate("SingleCommunityScreen", {community:community})}} style={styles.tabContainer}>
                <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>{community.name}</Text>
                <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>{community.description}</Text>
    
                
                <View style={styles.bottomSpace}>
                    <Text style={styles.joinedNum}>{community.members} Members</Text>
                </View>
            </Pressable>              );
            })
          }
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