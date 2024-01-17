
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from '../screens/Landing';
import CommunityNav from './communityNav';
import SymptomNav from './symptomNav';
import SettingNav from './settingNav';

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ResourceNav from './resourceNav';

const HexagonButton = ({ onPress }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.hexagon}>
        <View style={styles.hexagonInner} />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  hexagon: {
    width: 80,
    height: 45
  },
  hexagonInner: {
    width: 80,
    height: 45,
    backgroundColor: 'white'
  },
 
};

const bottomTab = createBottomTabNavigator();
function DashboardNav() {
    return (
      <bottomTab.Navigator initialRouteName='dashboard'>
        
        <bottomTab.Screen name='community' component={CommunityNav} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='symptom' component={SymptomNav} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='dashboard' component={Landing} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='resource' component={ResourceNav} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='setting' component={SettingNav} options={{headerShown: false}} ></bottomTab.Screen>
      </bottomTab.Navigator>
    )
  }

  export default DashboardNav;