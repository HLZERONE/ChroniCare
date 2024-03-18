import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/SettingScreen/SettingScreen";
import AboutUsScreen from "../screens/SettingScreen/AboutUsScreen";
import PrivacyScreen from "../screens/SettingScreen/PrivacyScreen";
import EditPassword from "../screens/SettingScreen/EditPassword";
import EditProfile from "../screens/SettingScreen/EditProfileScreen";

const settingStack = createNativeStackNavigator();

const SettingScreen = () => {
  return (
    <settingStack.Navigator>
      <settingStack.Screen
        name="SettingScreen"
        component={Setting}
        options={{ headerShown: false }}
        />
        <settingStack.Screen
        name="EditProfile"
        component={EditProfile}
       />
       <settingStack.Screen
       name = "EditPassword"
       component ={EditPassword}
       />
       <settingStack.Screen
       name = "PrivacyScreen"
       component={PrivacyScreen}
       ></settingStack.Screen>
       <settingStack.Screen
       name="AboutUsScreen"
       component={AboutUsScreen}
       ></settingStack.Screen>
    </settingStack.Navigator>
  );
}

export default SettingScreen;