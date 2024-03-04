import { Pressable, View, Text, StyleSheet, Image } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { currentUser } from "../../firebaseConnect/CurrentUserInfo";
import { upvoteDownvoteReply } from "../../firebaseConnect/Forum";
import { useState } from "react";



const MessageTab = (props:any)=>{
    const img = require('../../../assets/favicon.png')
    const {action, poster, reply, communityID, postID} = props
    const [userEngagement, setUserEngagement] = useState(reply.userEngagement);

    const handleUpvote = () => {
        reply.upvote(currentUser!.uid);
        upvoteDownvoteReply(communityID, postID, reply);
        setUserEngagement(reply.userEngagement.copy);
        // Update local state to trigger re-render
    };

    const handleDownvote = () => {
        reply.downvote(currentUser!.uid);
        upvoteDownvoteReply(communityID, postID, reply);
        setUserEngagement(reply.userEngagement.copy);
        // Update local state to trigger re-render
    };
    
    return(
            <View style={styles.tabcontainer}>
                <View style={styles.headerArea}>
                    <Image source={img} style={styles.userImage}></Image>
                    <Text>{poster.name}</Text>
                </View>
                <Text>
                    {reply.content}
                </Text>
                <View style={styles.bottomArea}>
                    <View style={styles.likeAndDislike}>
                        <Pressable onPress={handleUpvote}>
                            {
                                userEngagement.isUpVoted(currentUser!.uid) ? 
                                <FontAwesome name="thumbs-up" size={24} color="black" /> :
                                <FontAwesome name="thumbs-o-up" size={24} color="black" />
                            }
                        </Pressable>

                        {
                            userEngagement.weightedUpVotes != 0 ? <Text>{ userEngagement.weightedUpVotes }</Text> : null
                        }

                        <View style={styles.divider} />

                        <Pressable onPress={handleDownvote}>
                            {
                                userEngagement.isDownVoted(currentUser!.uid) ? 
                                <FontAwesome name="thumbs-down" size={24} color="black" /> :
                                <FontAwesome name="thumbs-o-down" size={24} color="black" />
                            }
                        </Pressable>
                    </View>
                    
                        <Pressable onPress={action} style={styles.pressableBox} >
                            <Text>Reply</Text>
                        </Pressable>
                </View>
            </View>


    )
}

export default MessageTab;

const styles = StyleSheet.create({
    tabcontainer:{
        margin: '2%',
        padding: '2%',
        backgroundColor: '#fff',
        borderRadius:16,
        maxHeight:'100%'
    },
    divider:{
        width: 1,
        backgroundColor: 'black',
        marginHorizontal: 4,
        // height: '100%'
        // Setting height to 100% doesn't work for some reason
        height: 24
    },
    likeAndDislike:{
        flexDirection:'row',
        gap:2,
        backgroundColor: 'rgba(87, 218, 179, 0.6)',
        borderWidth: 1,
        borderRadius: 24,
        borderColor:'#1EAFB3',
        justifyContent:'space-evenly',
        paddingHorizontal:3,
        paddingVertical:4,
        maxWidth:'25%',
        marginTop:3,
        minWidth:'24%',
        alignItems:'center'
    },
    likebutton:{
        width:24,
        height:24
    },
    bottomArea:{
        flexDirection:'row',
        alignItems:'center',
        gap:3,
        justifyContent:'space-between',
        paddingRight:'2%'
    },
    userImage:{
        width:20,
        height:20
    },
    headerArea:{
        flexDirection:'row',
        alignItems:'center',
        gap:3,
    },
    pressableBox:{
        width:50,
        height:25,
        alignItems:'center',
        justifyContent:'center',

    }
})