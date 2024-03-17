import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Button, Pressable, Switch, Image, TextInput} from "react-native";
import {SignOut } from '../../firebaseConnect/Auth';
import ChroniBlueButton from '../../components/chroniBlueButton';
import { curUserInfo } from '../../firebaseConnect/CurrentUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignCenter, faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";
import { FIREBASE_AUTH } from '../../../FirebaseConfig';


const EditProfileScreen = () => {
  const handleProfilePicSelection = () =>{
    console.log('Profile Pictutre')
  }
  const handleSaveButton = () =>{
    console.log('Save Changes')
  }

 

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
          <Image source={require('../../../assets/profilePic.png')} style={styles.profileImage}/>
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
         
        <TextInput
          placeholder="Peter"
          style={styles.profileInput}  
        />
        </View>

        <View style={styles.profileContainer}>
        <TextInput
          placeholder="Anteater"
          style={styles.profileInput}  
        />
        </View>
        
        <View style={styles.profileContainer}>
        <TextInput
          placeholder="panteater@gmail.com"
          style={styles.profileInput}  
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
          
        />
        </View>

        </View>
        <TouchableOpacity onPress={(handleSaveButton)} style={{
          backgroundColor: "#1EAFB3",
          borderRadius:10,
          padding:10,
          height:52
        }}>
          <Text style={{
            color: "#FFFFFF",
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '600',
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
  width: '60%',
  height: '36%',
  
  alignSelf: 'center',
},

profileContainer: {
  height: '8%',
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