import { RouteProp } from "@react-navigation/native";
import { Pressable, ScrollView, Text, View, StyleSheet} from "react-native";
import { CommunityStackNavList } from "./CommunityTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import CommunityModel from '../../firebaseConnect/data/Community';



type SearchResultNavigationProp = StackNavigationProp<CommunityStackNavList, 'SearchResult'>;
type SearchResultRouteProp = RouteProp<CommunityStackNavList, 'SearchResult'>;

type Props = {
    navigation: SearchResultNavigationProp;
    route: SearchResultRouteProp;
  };

const SearchResult = ({navigation, route}:Props)=>{
    const {communities} = route.params;

    return(
        <View>
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
    tabContainer:{
        backgroundColor: "#fff",
        borderRadius:16,
        height:"90%",
padding:8,
        marginHorizontal:3
    },
    tabTitle:{
        color: "#091F44", 
        justifyContent: 'flex-start', 
        textAlign: 'left', 
        fontWeight: '500',
        fontSize: 14,
        height:'20%'
    },
    tabTexts: {
        color: "#091F44", 
        fontSize: 12,
        fontWeight: '400',
        height:'45%'
    },
    bottomSpace:{
        flexDirection:'row',
        height:'35%',
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