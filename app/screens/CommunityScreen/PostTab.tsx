import { Pressable, View, Text, StyleSheet, Image } from "react-native"
import { Post } from "../../firebaseConnect/data/Post";
import { currentUser } from "../../firebaseConnect/CurrentUserInfo";
import { upvoteDownvotePost } from "../../firebaseConnect/Forum";
import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

interface PostTabProps {
    post: Post;
    communityID: string;
    action: ()=>void;
}

const PostTab = ({post, communityID, action}: PostTabProps)=>{
    const [userEngagement, setUserEngagement] = useState(post.userEngagement);

    const handleUpvote = () => {
        post.upvote(currentUser!.uid);
        upvoteDownvotePost(communityID, post);
        setUserEngagement(post.userEngagement.copy);
        // Update local state to trigger re-render
    };

    const handleDownvote = () => {
        post.downvote(currentUser!.uid);
        upvoteDownvotePost(communityID, post);
        setUserEngagement(post.userEngagement.copy);
        // Update local state to trigger re-render
    };

    const getWrappedContent = (content: string) => {
        return content.length > 50 ? content.substring(0, 50) + "..." : content;
    }
    
    return(
        <Pressable onPress={action}>
            <View style={styles.tabcontainer}>
                <Text>{ post.title }</Text>
                <Text>{ getWrappedContent(post.content) }</Text>
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
                        <Text> { post.replyCount } Responses</Text>
                </View>
            </View>
    </Pressable>

    )
}

export default PostTab;

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
        gap:3
    },
    upvotes: {
        
    }
})