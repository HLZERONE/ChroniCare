import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import CommunityScreen from "./CommunityNav";
import DashboardScreen from "./DashboardNav";
import ResourceScreen from "./ResourceNav";
import SettingScreen from "./settingNav";
import SymptomTrackerScreen from "./SymptomTrackerNav";

const bottomTab = createBottomTabNavigator();

function BottomTabNav() {
	return (
		<bottomTab.Navigator initialRouteName="dashboard"
		screenOptions={{
			headerShown: false,
			tabBarStyle: { display: 'none' } // This hides the tab bar itself
		}}
		>
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
