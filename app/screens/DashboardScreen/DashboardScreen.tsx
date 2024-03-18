import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Pressable} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../navigations/NavigationService';
import TabBar from '../../components/tabBar';
import { getCommunities } from '../../firebaseConnect/Forum';
import Community from '../../firebaseConnect/data/Community';



const Dashboard = () => {
  const [searchValue, setSearchValue] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCommunities().then((communities) => {
      setCommunities(communities);
    }).catch((error) => {
      console.log(error);
    });
  }, []);
  const handleSearchChange = (text: React.SetStateAction<string>) => {
    setSearchValue(text);
  };

  const navigateToCommunity = (community: Community) => {
    navigate(
      'Community',
      {
        screen: 'SingleCommunityScreen',
        params: { community }
      }
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ alignItems: 'center'}} style={{flex: 1}}>
        <Text style={styles.hello}>Hello, Username!</Text>
        <Text style={styles.question}>What would you like to do today?</Text>
        {/* Search Bar */}
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
        <View style={styles.boxContainer}>
          <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('FindDoctor' as never)}>
            <FontAwesome5 name="hospital" size={32} color="#E35F47" />
            <Text style={styles.boxText}>Find a Doctor</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box, { backgroundColor: '#DEEBFF' }]} onPress={() => navigation.navigate('SymptomTracker' as never)}>
            <FontAwesome5 name="pills" size={32} color="#1648CE" />
            <Text style={styles.boxText}>Track Symptoms</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.box, {backgroundColor: '#E4F8EB'}]} onPress={() => navigation.navigate('Resource' as never)}>
            <MaterialIcons name="library-books" size={32} color="#117639" />
            <Text style={styles.boxText}>View Library</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.communityContainer}>
            <Text style={styles.community}>Communities</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Community' as never)}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>

        </View>
          {/* Community Descriptions */}
          <View style={styles.communityBoxContainer}>
          {
            communities.map((community) => (
              <Pressable style={styles.communityBox} onPress={() => navigateToCommunity(community)} key={community.id}>
                <Image source={require('../../../assets/chroniLogo.png')} style={styles.communityImage} />
                <Text style={styles.communityTitle}>{community.name}</Text>
              </Pressable>
            ))
          }
        </View>
      </ScrollView>
      <TabBar navigation={navigation} state={3} />
    </View>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex:1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: 'rgba(117, 196, 205, 0.19)',
  },
  hello: {
    width: '100%',
    color: '#1EAFB3',
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center', 
    marginTop: '20%',
  },
  question: {
    color: '#090909',
    fontSize: 16,
    fontWeight: '500',
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
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '7%',
    marginRight: '16%',
   
    },
  box: {
    width: '31%',
    height: 88,
    backgroundColor: '#FAE9E9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    shadowColor: '#17426B',
    shadowOpacity: 0.05,
    shadowRadius: 20,
    marginHorizontal: '20%',
  },
  
  boxText: {
    color: '#091F44',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  communityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', 
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '5%',
  },
  community: {
    color: '#090909',
    fontSize: 16,
    fontWeight: '500',
  },
  viewAll: {
    color: '#1EAFB3',
    fontSize: 16,
    fontWeight: '500',
  },
  communityBoxContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%', 
    alignItems: 'center',
    marginTop: '5%',
  },
  communityBox: {
    width: '85%',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'flex-start',
    padding: 8,
    marginBottom: '3%',
    flexDirection: 'row',
  },
  communityImage: {
    width: '35%',
    height: '100%',
    marginVertical: '1%',
  },
  communityTitle: {
    color: '#091F44',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop:'2%',
  }
})


