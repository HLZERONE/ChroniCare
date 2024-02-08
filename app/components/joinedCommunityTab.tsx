import { Dimensions, Pressable, View } from "react-native"
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import JoinButton from "./joinButton";

var {height, width} = Dimensions.get('window');

function JoinedCommunityTab(props: any){
    return(
        <Pressable onPress={(props.action)} style={styles.tabContainer}>
            <Text style={styles.tabTitle} ellipsizeMode="tail">{props.title}</Text>
            <Text style={styles.tabTexts} ellipsizeMode="tail" >{props.intro}</Text>

            
            <View style={styles.bottomSpace}>
                <JoinButton ifJoined={props.ifJoined}></JoinButton>
                <Text style={styles.joinedNum}>1563 Members</Text>
            </View>
        </Pressable>
    )
}


export default JoinedCommunityTab;

const styles = StyleSheet.create({
    tabContainer:{
        backgroundColor: "#fff",
        borderRadius:16,
        height:height*0.2,
        width: width*0.45,
        paddingHorizontal:3,
        paddingTop:5,
        margin:3,

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