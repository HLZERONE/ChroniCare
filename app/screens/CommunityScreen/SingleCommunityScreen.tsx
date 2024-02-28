import { RouteProp, useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Button, Pressable } from 'react-native';
import { CommunityStackNavList } from './CommunityTypes';
import JoinButton from '../../components/joinButton';
import { StackNavigationProp } from '@react-navigation/stack';
import PostTab from './PostTab';
import { getPosts } from '../../firebaseConnect/Forum';
import { Post } from '../../firebaseConnect/data/Post';

//enable sending information to the postScreen
type SingleCommunityScreenNavigationProp = StackNavigationProp<CommunityStackNavList, 'PostScreen'>;

//get the information from CommunityScreen
type SingleCommunityScreenRouteProp = RouteProp<CommunityStackNavList, 'SingleCommunityScreen'>;


type Props = {
  navigation: SingleCommunityScreenNavigationProp;
  route: SingleCommunityScreenRouteProp;
};


const SingleCommunityScreen = ({ navigation, route }: Props) => {
  //take ifjoin from database
  const [isJoined, setIsJoined] = useState(false)
  const [posts, setPosts] = useState<Post[]>([]);
  const img = require('../../../assets/favicon.png');
  const plus = require('../../../assets/plus.png');
  const community = route.params.community

  useFocusEffect(() => {
    getPosts(community.id).then((posts) => {
      setPosts(posts);
    });
  });

  return (
    <View
      style={styles.container}>

      <ScrollView>
        {/* first row */}
        <View style={styles.headerArea}>
          <Image source={img} resizeMode="contain"></Image>
          <Text style={styles.title}>{community.name}</Text>
          <Text style={styles.memberNum}>{ community.members }</Text>
          <JoinButton ifJoined={true}></JoinButton>
        </View>
        <Text style={styles.description}>This community is for anyone to join. We will share resources for patients with heart disease to use.</Text>
        <View>
          {posts.map((post: Post) => {
            return (
              <PostTab post={post} key={post.id} communityID={community.id} 
              action={() => navigation.navigate('PostScreen', {post: post, communityID: community.id})}></PostTab>
            );
          })
          }
        </View>
      </ScrollView>
          <Pressable onPress={()=>{navigation.navigate('CreatePostPage', {cummunityID: community.id})}}>
            <Image source={plus} style={styles.plusButton}></Image>
          </Pressable>
    </View>
  );
};
export default SingleCommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(117, 196, 205, 0.19)',
    alignItems: 'center',
    padding: '2%',
  },
  headerArea: {
    paddingLeft:'2%',
    flexDirection: 'row',
    gap: 10
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
  plusButton:{
    width:50,
    height:50,
    position: 'absolute',
    right: '-40%',
    bottom: '20%'

  }


})