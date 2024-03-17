import React, { useCallback, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CommunityStackNavList } from './CommunityTypes';
import JoinButton from '../../components/joinButton';
import PostTab from './PostTab';
import { getPosts, joinCommunity, leaveCommunity } from '../../firebaseConnect/Forum';
import { Post } from '../../firebaseConnect/data/Post';
import { useCommunityContext } from '../../providers/CommunityProvider';

type SingleCommunityScreenNavigationProp = StackNavigationProp<CommunityStackNavList, 'PostScreen'>;
type SingleCommunityScreenRouteProp = RouteProp<CommunityStackNavList, 'SingleCommunityScreen'>;

type Props = {
  navigation: SingleCommunityScreenNavigationProp;
  route: SingleCommunityScreenRouteProp;
};

const SingleCommunityScreen = ({ navigation, route }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { joinedCommunities, joinCommunity, leaveCommunity } = useCommunityContext();
  const community = route.params.community;
  const [joined, setJoined] = useState(joinedCommunities.includes(community));

  useFocusEffect(
    useCallback(() => {
      getPosts(community.id).then((posts) => {
        setPosts(posts);
      });
    }, [community.id])
  );

  const handlePress = () => {
    if (joined) {
      leaveCommunity(community);
    } else {
      joinCommunity(community);
    }
    setJoined((current) => !current);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerArea}>
          <Image source={require('../../../assets/favicon.png')} resizeMode="contain" style={styles.logo} />
          <View style={styles.headerContent}>
            <View style={styles.headerText}>
              <Text style={styles.title}>{community.name}</Text>
              <Text style={styles.memberNum}>{community.members} members</Text>
            </View>
            <JoinButton ifJoined={joined} onPress={handlePress} />
          </View>
        </View>
        <Text style={styles.description}>
          This community is for anyone to join. We will share resources for patients with heart disease to use.
        </Text>
        <View>
          {posts.map((post: Post) => (
            <PostTab
              post={post}
              key={post.id}
              communityID={community.id}
              action={() => navigation.navigate('PostScreen', { post: post, community: community })}
            />
          ))}
        </View>
      </ScrollView>
      <Pressable onPress={() => navigation.navigate('CreatePostPage', { cummunityID: community.id })}>
        <Image source={require('../../../assets/plus.png')} style={styles.plusButton} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#091F44',
  },
  memberNum: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  description: {
    marginBottom: 16,
    fontSize: 16,
    color: '#091F44',
  },
  plusButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
});

export default SingleCommunityScreen;
