import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Button, Pressable, Switch, Image, TextInput} from "react-native";
import {SignOut } from '../../firebaseConnect/Auth';
import ChroniBlueButton from '../../components/chroniBlueButton';
import { curUserInfo } from '../../firebaseConnect/CurrentUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import EditProfile from "./EditProfileScreen";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useState } from "react";



const PasswordScreen = () => {
  const handleSaveButton = () =>{
    console.log('Save Password')
  }
  
  return(  

    <SafeAreaView style = {{
      flex: 1,
      backgroundColor: 'white',
      padding: '5%',


      }}>
    
        <View>
       
        <Text style={styles.title}>Change Password</Text>
        <Text style={styles.subtitle}>
          Type in your new password below
        </Text>
       
        <View style={styles.profileContainer}>
        <TextInput
          placeholder="New Password"
          style={styles.profileInput}  
        />
        </View>

        <View style={styles.profileContainer}>
        <TextInput
          placeholder="Comfirm Password"
          style={styles.profileInput}  
        />
        </View>
      
        

        </View>
        <View style = {{
          padding: '10%'
        }}></View>
        <TouchableOpacity  style={{
          backgroundColor: "#1EAFB3",
          borderRadius: 10,
          paddingTop:'3%',
          height:52
        }} onPress={(handleSaveButton)}>
          <Text style = {{
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
padding: '4%',
paddingTop: '4%',
fontSize: 30,
fontWeight: '700',
color: '#000000',
marginBottom: 6,
},
subtitle: {
  paddingLeft: '4%',
  color: '#8391A1',
  fontWeight: '500'
},

section: {
paddingTop: 12,
},

sectionHeader:{
paddingHorizontal: 24, 
paddingVertical: 8,
},

profileContainer: {
  height: 50,
  flexDirection: 'row',
  backgroundColor: 'white',
  borderRadius: 14.91,
  borderWidth: 2.21,
  borderColor: '#D2D2D2',
  width: '100%',
  marginTop: '5%',
  alignSelf: 'center',
  padding: '2%',
},
profileInput: {
  color: '#8A96BC',
  fontWeight: '300',
  fontSize: 14,
  paddingLeft: '3%',
  flex: 1,
},
saveButton: {
  color: "#FFFFFF",
  textAlign: 'center',
  fontSize: 20,
  fontWeight: '600',
}
});

export default PasswordScreen;