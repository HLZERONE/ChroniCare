import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Setting from "../screens/SettingScreen/SettingScreen";

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

export default SettingScreen;