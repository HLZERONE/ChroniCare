import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';
import { CommunityStackNavList } from './CommunityTypes';
import JoinButton from '../../components/joinButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';
import PostTab from './PostTab';

//get the information from CommunityScreen
type SingleCommunityScreenRouteProp = RouteProp<CommunityStackNavList, 'SingleCommunityScreen'>;

//enable sending information to the postScreen
type SingleCommunityScreenNavigationProp = StackNavigationProp<CommunityStackNavList, 'PostScreen'>;


type Props = {
  navigation: StackNavigationProp<CommunityStackNavList, 'PostScreen'>;
  route: SingleCommunityScreenRouteProp;
};


const SingleCommunityScreen = ({ navigation, route }: Props) => {
  //take ifjoin from database
  const [isJoined, setIsJoined] = useState(false)
  const img = require('../../../assets/favicon.png');


  const communityID = route.params.communityID;

  return (
    <View
      style={styles.container}>

      <ScrollView>
        {/* first row */}
        <View style={styles.headerArea}>
          <Image source={img} resizeMode="contain"></Image>
          <Text style={styles.title}>{communityID}</Text>
          <Text style={styles.memberNum}>1563 members</Text>
          <JoinButton ifJoined={true}></JoinButton>
        </View>
        <Text style={styles.description}>This community is for anyone to join. We will share resources for patients with heart disease to use.</Text>
        <View>
          <PostTab action={() => { navigation.navigate('PostScreen', { postID: '213' }) }}></PostTab>
          <PostTab action={() => { navigation.navigate('PostScreen', { postID: '213' }) }}></PostTab>

          <PostTab action={() => { navigation.navigate('PostScreen', { postID: '213' }) }}></PostTab>

          <PostTab action={() => { navigation.navigate('PostScreen', { postID: '213' }) }}></PostTab>
          <PostTab action={() => { navigation.navigate('PostScreen', { postID: '213' }) }}></PostTab>

          <PostTab action={() => { navigation.navigate('PostScreen', { postID: '213' }) }}></PostTab>



        </View>
      </ScrollView>


    </View>
  );
};
export default SingleCommunityScreen;

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
    color:'rgba(, 0, 0, 0.5)'
  },
  description:{
    margin: '2%',
    textAlign:'left',
    fontWeight: '400',
    fontSize: 14,
    color: '#091F44',
  }


})