import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Community from "../screens/CommunityScreen/CommunityScreen";

const communityStack = createNativeStackNavigator();

const CommunityScreen = () => {
  return (
    <communityStack.Navigator>
      <communityStack.Screen
        name="CommunityScreen"
        component={Community}
        options={{ headerShown: false, }}
        />
    </communityStack.Navigator>
  );
}

export default CommunityScreen;