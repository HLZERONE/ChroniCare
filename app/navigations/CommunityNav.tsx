import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Community from "../screens/CommunityScreen/CommunityScreen";
import SingleCommunityScreen from "../screens/CommunityScreen/SingleCommunityScreen";
import { CommunityStackNavList } from "../screens/CommunityScreen/CommunityTypes";
import PostScreen from "../screens/CommunityScreen/PostScreen";

const communityStack = createNativeStackNavigator<CommunityStackNavList>();


const CommunityScreen = () => {
  return (
    <communityStack.Navigator>
      <communityStack.Screen
        name="CommunityScreen"
        component={Community}
        options={{ headerShown: false, }}
        />
        <communityStack.Screen name="SingleCommunityScreen" component={SingleCommunityScreen} ></communityStack.Screen>
        <communityStack.Screen name = "PostScreen" component={PostScreen}></communityStack.Screen>
    </communityStack.Navigator>
  );
}

export default CommunityScreen;