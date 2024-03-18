import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Button, Pressable, Switch, Image, TextInput} from "react-native";
import {SignOut } from '../../firebaseConnect/Auth';
import ChroniBlueButton from '../../components/chroniBlueButton';
import { curUserInfo } from '../../firebaseConnect/CurrentUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import EditProfile from "./EditProfileScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState, useEffect } from "react";
import { FIREBASE_AUTH } from '../../../FirebaseConfig';
import { getUserInfo} from '../../firebaseConnect/CurrentUserInfo';
import { setUserInfo } from "../../firebaseConnect/ProfileInfo";
import * as ImagePicker from 'expo-image-picker';




const EditProfileScreen = () => {

  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zip, setZip] = useState('');
  const [diseases, setDiseases] = useState('');
  const [description, setDescription] = useState('');

  const [image, setImage] = useState();

  useEffect(() => {
    
    fetchUserInfo();
  }, []);

 
  const fetchUserInfo = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
        const userInfo = await getUserInfo(user.uid);
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setEmail(userInfo.email);
        setAddress(userInfo.address);
        setZip(userInfo.zip);
        setDescription(userInfo.description);
      }
    } catch (error) {
      console.error('Error fetching user info:', error.message);
    }
  };

  const handleProfilePicSelection = async () =>{
    console.log('Profile Pictutre')
      
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };

  
  const handleSaveButton = async () => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (user) {
      const u = await setUserInfo(user.uid,{
        email,
        firstName,
        lastName,
        address,
        zip,
        description,
        diseases
      });
      // After saving, navigate back
      navigation.goBack();
    }
      } catch (error) {
        console.error('Error fetching user info:', error.message);
      }
  };

 

  return(  

    <SafeAreaView style = {{
      flex: 1,
      backgroundColor: 'white',
      padding: '5%',


      }}>
    
        <View>
        
        <Text style={styles.title}>Edit Profile</Text>
        <View style= {styles.profileImageContainer}>
          <TouchableOpacity onPress={handleProfilePicSelection}>
          <Image source={{uri: image}}
          default source = {require('../../../assets/profilePic.png')}
          style={styles.profileImage}/>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
         
        <TextInput
          
          style={styles.profileInput} 
          placeholder="First Name"
          value={firstName}
          onChangeText={value=> setFirstName(value)} 
        />
        </View>

        <View style={styles.profileContainer}>
        <TextInput
          style={styles.profileInput}  
          placeholder="Last Name"
          value={lastName}
          onChangeText={value => setLastName(value)}
        />
        </View>
        
        <View style={styles.profileContainer}>
        <TextInput
          placeholder="Email"
          style={styles.profileInput}  
          value={email}
            onChangeText={value => setEmail(value)}
        />
        </View>
        <View style={styles.profileContainer}>
          <TextInput
            placeholder="Address"
            style={styles.profileInput}
            value={address}
            onChangeText={value => setAddress(value)}
          />
        </View>
        <View style={styles.profileContainer}>
          <TextInput
            placeholder="Zip Code"
            style={styles.profileInput}
            value={zip}
            onChangeText={value => setZip(value)}
          />
        </View>

        <Text style={{
          color: '#8A96BC',
          fontWeight: '400',
          fontSize: 14,
          paddingTop: '3%'

        }}>Description</Text>
        <View style={styles.profileContainerDescription}>
          
        <TextInput
          placeholder="Zot Zot Zot"
          style={styles.profileInput} 
          value={diseases}
            onChangeText={value => setDiseases(value)}
          
        />
        </View>

        </View>
        <TouchableOpacity onPress={handleSaveButton} style={{
          backgroundColor: "#1EAFB3",
          borderRadius: 10,
          padding:'1%',
          height:'6%'
        }}>
          <Text style={{
            color: "#FFFFFF",
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 600,
          }}>
            Save
          </Text>
        </TouchableOpacity>
        
        </SafeAreaView>
 
);
};


const styles = StyleSheet.create({
container: {
paddingVertical: 10,
},

header: {

},

title: {
padding: '3%',
paddingTop: '3%',
fontSize: 30,
fontWeight: '700',
color: '#000000',
marginBottom: 6,
},
section: {
paddingTop: 12,
},
sectionHeader:{
paddingHorizontal: 24, 
paddingVertical: 8,
},


profileImage:{

  width: '90%',
  height: '96%',
  marginVertical: '1%',
  alignSelf: 'center',
},

profileImageContainer: {
  width: '50%',
  height: '28%',
  
  alignSelf: 'center',
},

profileContainer: {
  height: '6%',
  width: '100%',
  flexDirection: 'row',
  backgroundColor: 'white',
  borderRadius: 14.91,
  borderWidth: 2.21,
  borderColor: '#D2D2D2',
  marginTop: '4%',
  alignSelf: 'center',
  padding: '2%',
},
profileContainerDescription: {
  height: '8%',
  width: '100%',
  flexDirection: 'row',
  backgroundColor: 'white',
  borderRadius: 14.91,
  borderWidth: 2.21,
  borderColor: '#D2D2D2',
  marginTop: '1%',
  alignSelf: 'center',
  padding: '2%',
},

profileInput: {
  color: '#8A96BC',
  fontWeight: '300',
  fontSize: 14,
  paddingLeft: '3%',
  flex: 1,
}
});

export default EditProfileScreen;