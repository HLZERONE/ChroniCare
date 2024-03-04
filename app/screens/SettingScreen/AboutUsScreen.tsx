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
import { useState } from "react";
import { FIREBASE_AUTH } from '../../../FirebaseConfig';


const AboutUsScreen = () => {


  return(  

    <SafeAreaView style = {{
      flex: 1,
      backgroundColor: 'white',
      }}>
    
        <ScrollView>
        
        <Text style={styles.title}>About Us</Text>
        
      
        <Text style={styles.subtitle}>
        {'\t'}Chronic illnesses affect 133 million Americans, contributing to 7 out of 10 deaths in the U.S. These diseases, such as heart disease and diabetes, place a staggering burden on individuals and our healthcare system, costing $3.7 trillion each year. A major challenge for patients is managing their conditions, often hindered by limited access to vital information and support. Addressing this issue is crucial. Ensuring adequate resources and assistance can profoundly impact the health and well-being of millions suffering from chronic diseases.
        </Text>


        <Text style={styles.subtitle}>
        {'\t'}At ChroniCare, we believe in the power of community. Our platform fosters a supportive, safe space where users can share experiences and advice, forging connections with others on similar health journeys. ChroniCare equips you with educational resources and cutting-edge health management tools, empowering you to take control of your health and reduce hospital visits, thus lowering healthcare costs.
        </Text>

     
        <Text style={styles.subtitle}>
        {'\t'}In partnership with Tata Consultancy Services, we're not just a mobile app; we're a movement. Together, we're redefining the landscape of chronic disease management, one empowered user at a time. {'\n\n'}Thank you for choosing ChroniCare.
        </Text>

        </ScrollView>
     
        </SafeAreaView>
 
);
};


const styles = StyleSheet.create({
container: {
paddingVertical: '6%',
},


title: {
fontSize: 32,
fontWeight: '700',
color: '#FFFFFF',
marginBottom: '1%',
paddingTop: "21%",
paddingHorizontal: '5%',
paddingBottom: '2%',
backgroundColor: '#1EAFB3'
},
subtitleTitle:{
fontSize: 18, 
fontWeight: '800', 
color: 'black',
padding: '3%',
alignSelf: 'center',

},

subtitle: {
fontSize: 17, 
fontWeight: '400', 
color: 'black',
padding: '4.5%'
},

});

export default AboutUsScreen;