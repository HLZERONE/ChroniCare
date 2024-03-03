import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Button, Pressable, Switch} from "react-native";
import {SignOut } from '../../firebaseConnect/Auth';
import ChroniBlueButton from '../../components/chroniBlueButton';
import { curUserInfo } from '../../firebaseConnect/CurrentUserInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserLarge } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import TabBar from "../../components/tabBar";
import { useNavigation } from "@react-navigation/native";


const Setting = () => {
  const navigation = useNavigation();
  const handleEditProfile = () => {
    console.log('Edit Profile');
  };

  const handleViewAchievements = () => {
    console.log('View Achievements');
  };

  const handleTurnOnLocation = () => {
    console.log('Turn On Location');
  };

  const handlePushNotifications = () => {
    console.log('Push Notifications');
  };

  const handleChangePassword = () => {
    console.log('Change Password');
  };

  const handlePrivacy = () => {
    console.log('Privacy');
  };

  const handleAboutUs = () => {
    console.log('About Us');
  };
  
  const handleLogout = () => {
    
    console.log('Logout');
  };

  const sections = [
    {
        header: 'Account',
        items:[
            { id: 'profile', icon: 'user', label: 'Edit Profile', type: 'select',},
            { id: 'achievements', icon: 'star', label: 'View Achievements', type: 'select'},
            { id: 'location', icon:'location-arrow', label: 'Turn On Location', type: 'toggle'},
            { id: 'notifications',icon: 'bell-o', label: 'Push Notifications', type: 'toggle'}
        ],
    },
    {
        header: 'Security',
        items:[
            { id: 'password', icon:'lock', label: 'Change Password', type: 'select'},
            { id: 'privacy', icon: 'shield', label: 'Privacy', type: 'select'},
            { id: 'about', icon: 'info-circle', label: 'About Us', type: 'select'}
        ]

    },
    
];

  return(  
  <View style = {{flex: 1}}>
  <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}> <FontAwesome5 name="arrow-left" size={25} color="white" style= {{marginRight: 10}}/> Settings</Text>
      </View>

      {sections.map(({header, items}) => (
          <View style={styles.section} key={header}>
              <View style={styles.sectionHeader}>
                  <Text style={styles.sectionHeaderText}>{header}</Text>
              </View>
              <View >
                  {items.map(({label, id, type, icon}, index)=> (
                      <View style={[styles.rowWrapper,
                      index === 0 &&{borderTopWidth: 0},
                  ]}
                  key={id}>
                      <TouchableOpacity onPress={()=>{
                          switch (id) {
                              case 'profile':
                                handleEditProfile();
                                break;
                              case 'achievements':
                                handleViewAchievements();
                                break;
                              case 'location':
                                handleTurnOnLocation();
                                break;
                              case 'notifications':
                                handlePushNotifications();
                                break;
                              case 'password':
                                  handleChangePassword();
                                  break;
                              case 'privacy':
                                  handlePrivacy();
                                  break;
                              case 'about':
                                  handleAboutUs();
                                  break;
                    
                              default:
                                break;
                            }
                      }}>
                          <View style= {styles.row}>

                          <FontAwesome name ={icon} color='#1EAFB3' size={23} style= {{marginRight: 10}}/>

                              <Text style={styles.rowLabel}>{label}</Text>
                              <View style={styles.rowSpacer}/>
                              {type=== "select" &&(
                                  <FontAwesome name = 'angle-right' size={24} />
                              )}

                              {type === 'toggle' && (
                                  <Switch/>
                              )}
                          </View>
                      </TouchableOpacity>
                  
              </View>
              ))}
          </View>
      

      </View>
      
      ))}
      <ChroniBlueButton name="Log Out" action={SignOut}></ChroniBlueButton>
      
  </ScrollView>
  <TabBar navigation={navigation} state={{ index: 4 }} />
</View>
)


};


const styles = StyleSheet.create({
container: {

},
header: {

marginBottom: 10,
},
title: {
fontSize: 32,
fontWeight: '700',
color: '#FFFFFF',
marginBottom: 6,
paddingTop: 131,
paddingHorizontal: 10,
paddingBottom: 9,
backgroundColor: '#1EAFB3'
},
subtitle: {
fontSize: 15, 
fontWeight: '500', 
color: '#929292',
},
section: {
paddingTop: 12,
},
sectionHeader:{
paddingHorizontal: 24, 
paddingVertical: 8,
},

sectionHeaderText: {
fontSize: 17, 
fontWeight: '700', 
color: '#000',
textTransform: 'uppercase',
},
rowWrapper: {
paddingLeft: 24,
borderTopWidth: 1,
borderColor: '#e3e3e3',
backgroundColor: '#fff'
},
row: {
height: 50,
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'flex-start',
paddingRight: 24

},
rowLabel: {
fontSize: 16,
fontWeight: '400',
color: '#000'
},
rowSpacer: {
flex: 1,
},
rowValue: {
fontSize: 17,
color: '#616161',
marginRight: 4,
},
});
export default Setting;
