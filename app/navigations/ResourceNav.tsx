import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Resource from "../screens/ResourceScreen/ResourceScreen";

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

export default ResourceScreen;