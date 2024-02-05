import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {Text, View, StyleSheet, Image } from 'react-native';
import { CommunityStackNavList } from './CommunityTypes';
import JoinButton from '../../components/joinButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from 'expo-router';

//get the information from CommunityScreen
type SingleCommunityScreenRouteProp = RouteProp<CommunityStackNavList, 'SingleCommunityScreen'>;

//enable sending information to the postScreen
type SingleCommunityScreenNavigationProp = StackNavigationProp<CommunityStackNavList, 'PostScreen'>;


type Props = {
  route: SingleCommunityScreenRouteProp;
};


const SingleCommunityScreen = ({ route }: Props) => {
  //take ifjoin from database
  const [isJoined, setIsJoined] = useState("false")
  const img = require('../../../assets/favicon.png');
  const navigation = useNavigation<SingleCommunityScreenNavigationProp>()


  const communityID = route.params;
  return (
    <View
      style={styles.container}>
        {/* first row */}
        <View>
        <Image source={img}  resizeMode="contain"></Image>
        <Text>This is a Community</Text>
        <Text>1563 members</Text>
        <JoinButton></JoinButton>
        </View>
        <Text>This community is for anyone to join. We will share resources for patients with heart disease to use.</Text>


    </View>
  );
};
export default SingleCommunityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'rgba(117, 196, 205, 0.19)',
    alignItems: 'center'
  },
  Communities: {
    width: '90%',
    color: '#091F44',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: '20%',
  },
  trending: {
    width: '90%',
    color: '#091F44',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    marginTop: '5%',
  },
  horizontalScrollBox: {
    height: "20%",
    width: "90%",
  },
  searchContainer: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(80, 208, 199, 0.50)',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#1EAFB3',
    width: 342,
    marginTop: '8%',
    opacity: 0.35,
    alignSelf: 'center'
  },

  searchIcon: {
    marginLeft: '5%',
  },
  searchInput: {
    color: '#4D4D99',
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: '3%',
    flex: 1,
  },
  verticalScrollLayout:{
    flex:1,
    flexDirection:'column',
    width:"90%",
  }
})