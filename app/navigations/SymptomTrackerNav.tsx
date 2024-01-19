import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SymptomTracker from "../screens/SymptomTrackerScreen/SymptomTrackerScreen";

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

export default SymptomTrackerScreen;