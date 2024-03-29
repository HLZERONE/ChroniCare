import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Resource from "../screens/ResourceScreen/ResourceScreen";
import ResourceShow from "../screens/ResourceScreen/ResourceShow";
import { ResourceStackNavList } from "../screens/ResourceScreen/ResourceTypes";

const resourceStack = createNativeStackNavigator<ResourceStackNavList>();

const ResourceScreen = () => {
  return (
    <resourceStack.Navigator
    screenOptions={{
			headerShown: false,
		}}>
      <resourceStack.Screen
        name="ResourceScreen"
        component={Resource}
      />
      <resourceStack.Screen
        name="ResourceShow"
        component={ResourceShow}
        initialParams={{ resourceTitle: '', content: '' }}
        options={{ title: 'Resource' }}
      />
    </resourceStack.Navigator>
  );
}

export default ResourceScreen;