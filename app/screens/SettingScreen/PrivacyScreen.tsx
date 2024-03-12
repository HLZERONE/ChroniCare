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


const PrivacyScreen = () => {


  return(  

    <SafeAreaView style = {{
      flex: 1,
      backgroundColor: 'white',
      }}>
    
        <ScrollView>
        
        <Text style={styles.title}>Privacy</Text>
        <Text style={styles.subtitleTitle}> DISCLAIMER 
        </Text>
        <Text style={styles.subtitleBold}>{'\t'}ChroniCare provides information and support for managing chronic diseases. We do not provide diagnoses or medical treatment. Please consult a doctor for any questions or concerns regarding treatment or diagnoses. Our content is for informational purposes only and should not replace professional medical advice.</Text>
        <Text style={styles.subtitleTitle}>
        Privacy Policy of ChroniCare
        </Text>
        <Text style={styles.subtitle}>
        {'\t'} This page is used to inform  visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service, the ChroniCare application. {'\n\n'}{'\t'}If you choose to use our Service, then you agree to the collection and use of information in relation with this policy. The Personal Information that we collect are used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.

        </Text>

        <Text style={styles.subtitleTitle}>
        Information Collection and Use
        </Text>
        <Text style={styles.subtitle}>
        {'\t'} For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to your name, email, and postal address. The information that we collect will be used to contact or identify you.
        </Text>

        <Text style={styles.subtitleTitle}>
        Log Data
        </Text>
        <Text style={styles.subtitle}>
        {'\t'}We want to inform you that whenever you visit our Service, we collect information that your browser sends to us that is called Log Data. This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other statistics.
        </Text>
       
        <Text style={styles.subtitleTitle}>
        Service Providers
        </Text>
        <Text style={styles.subtitle}>
        {'\t'} We may employ third-party companies and individuals due to the following reasons:{'\n\n'}
    -To facilitate our Service;{'\n\n'}
    -To provide the Service on our behalf;{'\n\n'}
    -To perform Service-related services; or{'\n\n'}
    -To assist us in analyzing how our Service is used. {'\n\n'}
    

    {'\t'} We want to inform our Service users that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
        </Text>

        <Text style={styles.subtitleTitle}>
        Security
        </Text>
        <Text style={styles.subtitle}>
        {'\t'}We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
        </Text>

        <Text style={styles.subtitleTitle}>
        Links to Other Sites
        </Text>
        <Text style={styles.subtitle}>
        {'\t'} Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over, and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
        </Text>

        <Text style={styles.subtitleTitle}>
        Changes to This Privacy Policy
        </Text>
        <Text style={styles.subtitle}>
        {'\t'} We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately, after they are posted on this page.
        </Text>

        <Text style={styles.subtitleTitle}>
        Contact Us
        </Text>
        <Text style={styles.subtitle}>
        {'\t'} If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
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
subtitleBold: {
fontSize: 17, 
fontWeight: '800', 
color: 'black',
padding: '3%',
alignSelf: 'center',

},
subtitle: {
fontSize: 16, 
fontWeight: '500', 
color: 'black',
padding: '3%'
},

});

export default PrivacyScreen;