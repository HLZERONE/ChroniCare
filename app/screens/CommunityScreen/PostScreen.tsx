import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { CommunityStackNavList } from "./CommunityTypes";
import { View, Text, ScrollView, StyleSheet, Image, TextInput, Pressable, Dimensions } from "react-native";
import JoinButton from "../../components/joinButton";
import MessageTab from "./messageTab";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { curUserInfo } from "../../firebaseConnect/CurrentUserInfo";
import { createReply, getReplies, joinCommunity, leaveCommunity } from "../../firebaseConnect/Forum";
import { Post } from "../../firebaseConnect/data/Post";
import Reply from "../../firebaseConnect/data/Reply";
import { useCommunityContext } from "../../providers/CommunityProvider";



type PostScreenNavigationProp = StackNavigationProp<CommunityStackNavList, 'CreateReplyPage'>;


type PostScreenRouteProp = RouteProp<CommunityStackNavList, 'PostScreen'>;

const {height, width} = Dimensions.get('window');

type Props = {
    navigation: PostScreenNavigationProp;
    route: PostScreenRouteProp;
  };

const PostScreen = ({navigation, route }: Props)=>{
    const {community} = route.params
    const img = require('../../../assets/favicon.png');
    const [replyContent, setReplyContent] = useState('')
    const [post, setPost] = useState<Post>(route.params.post);
    const [replies, setReplies] = useState<Reply[]>([]);
    const { joinedCommunities, joinCommunity, leaveCommunity } = useCommunityContext();
    const [joined, setJoined] = useState(joinedCommunities.includes(community));

    useFocusEffect(useCallback(() => {
      getReplies(community.id, post.id).then((replies)=>{
        setReplies(replies);
      }).catch((e)=>{
        console.log('getReplies error: '+e);
      });
      }, [replies]));
     
    const handlePress = () => {
      if (joined) {
        leaveCommunity(community);
      } else {
        joinCommunity(community);
      }
      setJoined((current) => !current);
    }

    return(
        <View  style={styles.container}>
            <ScrollView style={{width: "100%"}}>
                <View style={styles.headerArea}>
                    <Image source={img} resizeMode="contain"></Image>
                    <Text style={styles.title}>{community.name}</Text>
                    <Text style={styles.memberNum}>{community.members} members</Text>
                    <JoinButton ifJoined={joined} onPress={handlePress}></JoinButton>
                </View>
                <Text style={styles.description}>{community.description}</Text>

                <View style={styles.headerArea}>
                    <Text>by: </Text>
                    <Image source={img} style={styles.userImage}></Image>
                    <Text>{curUserInfo.fullName}</Text>
                </View>
                <Text style={styles.description}>{post.content}</Text>
                {
                  replies.map((reply) => {
                      return (
                          <MessageTab action={()=>{navigation.navigate('CreateReplyPage', {postIDReplyTo:post.id})}} poster={reply.user} 
                          reply={reply} communityID={community.id} postID={post.id} key={reply.id}>
                          </MessageTab>
                      );
                  })
                }
            </ScrollView>
            <View style={styles.replyView}>
              <TextInput placeholder="add your reply" style={styles.replyBox} value={replyContent} onChangeText={setReplyContent}></TextInput>
              <Pressable onPress={()=>{
                createReply(community.id, post.id, replyContent, curUserInfo).then((reply)=>{
                  setReplyContent('')
                  replies.push(reply);
                  // popup message saying reply created
                  }).catch((e)=>{
                    console.log('createReply error: '+e);
                  });
              }}>
                <Text>
                  Reply
                </Text>
              </Pressable>
            </View>
        </View>
    )
}

export default PostScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(117, 196, 205, 0.19)',
      alignItems: 'center',
      padding: '2%',
    },
    headerArea: {
      paddingLeft:'2%',
      flexDirection: 'row',
      gap: 10,
      width: "100%"
    },
    title: {
      fontWeight: '600',
      fontSize: 16,
      color: '#091F44',
      maxWidth:'40%',
  
    },
    memberNum: {
      fontWeight: '400',
      fontSize: 10,
      color:'rgba(0, 0, 0, 0.5)'
    },
    description:{
      margin: '2%',
      textAlign:'left',
      fontWeight: '400',
      fontSize: 14,
      color: '#091F44',
    },
    userImage:{
        width:20,
        height:20
    },
    replyView:{
      width: width*1.0,
      height: height*0.1,
      flexDirection:'row',
      backgroundColor:'white',
      justifyContent: 'space-between',
      paddingHorizontal:'5%',
      marginBottom:'-3%',
      alignItems:'center'
    },
    replyBox:{
      flex:1,
      borderWidth:1,
      borderRadius:15,
      borderColor: '#D2D2D2',
      minHeight: height*0.08,
      marginRight:'1%',
      paddingLeft:'1%'

    }
  
  
  })