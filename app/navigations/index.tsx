import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Community from '../screens/Community';
import SymptomTracker from '../screens/SymptomTracker';
import Dashboard from '../screens/Dashboard';
import Resource from '../screens/Resource';
import Setting from '../screens/Setting';

const bottomTab = createBottomTabNavigator();
function BottomTabNav() {
    return (
      <bottomTab.Navigator initialRouteName='dashboard'>
        
        <bottomTab.Screen name='community' component={Community} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='symptom' component={SymptomTracker} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='dashboard' component={Dashboard} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='resource' component={Resource} options={{headerShown: false}} ></bottomTab.Screen>
        <bottomTab.Screen name='setting' component={Setting} options={{headerShown: false}} ></bottomTab.Screen>
      </bottomTab.Navigator>
    )
  }

  export default BottomTabNav;