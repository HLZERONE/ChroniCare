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
    tabContainer: {
        flex: 1,
        minWidth: 150, // Minimum width for each tab to prevent excessive shrinking
        minHeight: 100, // Minimum height for each tab
        margin: 5,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Added justifyContent to space out content inside each tab
        justifyContent: 'space-between',
      },
      tabTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333', // Dark grey color for the text
        marginBottom: 5, // Margin below the title for spacing
      },
    
      // Style for the description text in each tab
      tabTexts: {
        fontSize: 14,
        color: '#666', // Medium grey color for the text
        marginBottom: 10, // Margin below the text for spacing
      },
    
      // Style for the bottom space of each tab, which includes the join button and member count
      bottomSpace: {
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center', // Center items vertically in the row
        justifyContent: 'space-between', // Space items evenly in the row
      },
    joinedNum:{
        fontSize:10,
        color: 'rgba(0, 0, 0, 0.5)',
        marginLeft:2
    },
})