import { Pressable, View, Text, StyleSheet, Image } from "react-native"
import { Post } from "../../firebaseConnect/data/Post";

interface PostTabProps {
    post: Post;
    communityID: string;
    action: ()=>void;
}

const PostTab = ({post, communityID, action}: PostTabProps)=>{
    const likeButton = require('../../../assets/likeButton.png');
    const dislikeButton = require('../../../assets/dislikeButton.png')

    const handleLike = ()=>{
        console.log("like button pressed")
    };

    const handleDisLike = ()=>{
        console.log("Dislike button pressed")
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
                        <Pressable onPress={handleLike}>
                            <Image source={likeButton} style={styles.likebutton}></Image>

                        </Pressable>
                        <View style={styles.divider} />
                        <Pressable onPress={handleDisLike}>
                        <Image source={dislikeButton} style={styles.likebutton}></Image>
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
        borderRightColor: '#000',
        borderRightWidth:1
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
        minWidth:'24%'

    },
    likebutton:{
        width:24,
        height:24
    },
    bottomArea:{
        flexDirection:'row',
        alignItems:'center',
        gap:3
    }
})