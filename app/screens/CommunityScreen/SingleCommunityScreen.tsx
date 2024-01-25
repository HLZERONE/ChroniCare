import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TextInput } from 'react-native';
import CommunityTab from '../../components/communityTab';


const Community = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (text: React.SetStateAction<string>) => {
    setSearchValue(text);
  };
  return (
    <View
      style={styles.container}>
      <Text style={styles.Communities}>Communities</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={30} color="#4D4D99" style={styles.searchIcon} />
        <TextInput
          placeholder="Search symptoms, medications..."
          style={styles.searchInput}
          placeholderTextColor="#4D4D99"
          value={searchValue}
          onChangeText={handleSearchChange}
        />
      </View>
      <Text style={styles.trending}>Treading</Text>
      <View style={styles.horizontalScrollBox}> 
        <ScrollView indicatorStyle='black'horizontal={true}>
          <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
          <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
          <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
          <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>

        </ScrollView>
      </View>

      <Text style={styles.trending}>Joined Communities</Text>
        <ScrollView style={styles.verticalScrollLayout} horizontal={false}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
        <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
        <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
        </View>

        <View style={{flexDirection:'row'}}>
        <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
        <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
        </View>

        <View style={{flexDirection:'row'}}>
        <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
        <CommunityTab title="This is a Community" intro='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et'></CommunityTab>
        </View>
        </ScrollView>


    </View>
  );
};
export default Community;

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