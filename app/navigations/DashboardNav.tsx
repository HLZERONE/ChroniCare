import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "../screens/DashboardScreen/DashboardScreen";

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

export default DashboardScreen;