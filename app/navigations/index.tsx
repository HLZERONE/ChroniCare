import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from "react";
import Community from "../screens/CommunityScreen/CommunityScreen";
import SymptomTracker from "../screens/SymptomTrackerScreen/SymptomTrackerScreen";
import Dashboard from "../screens/DashboardScreen/DashboardScreen";
import Resource from "../screens/ResourceScreen/ResourceScreen";
import Setting from "../screens/SettingScreen/SettingScreen";

const bottomTab = createBottomTabNavigator();

const dashboardStack = createNativeStackNavigator();

const DashboardScreen = () => {
	return (
		<dashboardStack.Navigator>
			<dashboardStack.Screen
				name="DashboardScreen"
				component={Dashboard}
				options={{ headerShown: false }}
        />
		</dashboardStack.Navigator>
	);
};

const symptomStack = createNativeStackNavigator();

const SymptomTrackerScreen = () => {
  return (
    <symptomStack.Navigator>
      <symptomStack.Screen
        name="SymptomScreen"
        component={SymptomTracker}
        options={{ headerShown: false }}
        />
    </symptomStack.Navigator>
  );
}

const communityStack = createNativeStackNavigator();

const CommunityScreen = () => {
  return (
    <communityStack.Navigator>
      <communityStack.Screen
        name="CommunityScreen"
        component={Community}
        options={{ headerShown: false }}
        />
    </communityStack.Navigator>
  );
}

const resourceStack = createNativeStackNavigator();

const ResourceScreen = () => {
  return (
    <resourceStack.Navigator>
      <resourceStack.Screen
        name="ResourceScreen"
        component={Resource}
        options={{ headerShown: false }}
        />
    </resourceStack.Navigator>
  );
}

const settingStack = createNativeStackNavigator();

const SettingScreen = () => {
  return (
    <settingStack.Navigator>
      <settingStack.Screen
        name="SettingScreen"
        component={Setting}
        options={{ headerShown: false }}
        />
    </settingStack.Navigator>
  );
}

function BottomTabNav() {
	return (
		<bottomTab.Navigator initialRouteName="dashboard">
			<bottomTab.Screen
				name="Community"
				component={CommunityScreen}
				options={{ headerShown: false }}
			></bottomTab.Screen>
			<bottomTab.Screen
				name="SymptomTracker"
				component={SymptomTrackerScreen}
				options={{ headerShown: false }}
			></bottomTab.Screen>
			<bottomTab.Screen
				name="Dashboar"
				component={DashboardScreen}
				options={{ headerShown: false }}
			></bottomTab.Screen>
			<bottomTab.Screen
				name="Resource"
				component={ResourceScreen}
				options={{ headerShown: false }}
			></bottomTab.Screen>
			<bottomTab.Screen
				name="Setting"
				component={SettingScreen}
				options={{ headerShown: false }}
			></bottomTab.Screen>
		</bottomTab.Navigator>
	);
}

export default BottomTabNav;
