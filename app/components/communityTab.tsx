import { Dimensions, Pressable, View } from "react-native"
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import JoinButton from "./joinButton";
import Community from "../firebaseConnect/data/Community";
import { joinCommunity, leaveCommunity } from "../firebaseConnect/Forum";
import { useState } from "react";
import { useCommunityContext } from "../providers/CommunityProvider";

var {height, width} = Dimensions.get('window');

function CommunityTab(props: {ifJoined: boolean, action: any, community: Community}){
    const { joinedCommunities, joinCommunity, leaveCommunity } = useCommunityContext();
    const [joined, setJoined] = useState(joinedCommunities.includes(props.community));

    const handlePress = () => {
        if (joined) {
            leaveCommunity(props.community);
        } else {
            joinCommunity(props.community);
        }
        setJoined((current) => !current);
    }

    return(
        <Pressable onPress={(props.action)} style={styles.tabContainer}>
            <Text style={styles.tabTitle} ellipsizeMode="tail" numberOfLines={1}>{props.community.name}</Text>
            <Text style={styles.tabTexts} ellipsizeMode="tail" numberOfLines={2}>{props.community.description}</Text>

            
            <View style={styles.bottomSpace}>
                <JoinButton ifJoined={joined} onPress={handlePress} ></JoinButton>
                <Text style={styles.joinedNum}>{props.community.members} Members</Text>
            </View>
        </Pressable>
    )
}


export default CommunityTab;

const styles = StyleSheet.create({
    tabContainer:{
        backgroundColor: "#fff",
        borderRadius:16,
        height:"90%",
        width: width*0.4,
        padding:8,
        marginHorizontal:3
    },
    tabTitle:{
        color: "#091F44", 
        justifyContent: 'flex-start', 
        textAlign: 'left', 
        fontWeight: '500',
        fontSize: 14,
        height:'30%'
    },
    tabTexts: {
        color: "#091F44", 
        fontSize: 12,
        fontWeight: '400',
        height:'45%',
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