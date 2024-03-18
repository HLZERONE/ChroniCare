import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/DashboardScreen/DashboardScreen";
import CommunityScreen from "./CommunityNav";

const dashboardStack = createNativeStackNavigator();

const DashboardScreen = () => {
	return (
		<dashboardStack.Navigator>
			<dashboardStack.Screen
				name="DashboardScreen"
				component={Dashboard}
				options={{ headerShown: false }}
        />
		<dashboardStack.Screen name = "CommunityNav" component={CommunityScreen} options={{ headerShown: false }}></dashboardStack.Screen>
						
		</dashboardStack.Navigator>
	);
};

export default DashboardScreen;