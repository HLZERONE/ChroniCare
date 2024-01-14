
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text } from 'react-native';

const dashboardStack = createNativeStackNavigator();

export default function SymptomNav() {
    return (
      <View>
        <Text>Symptom Page</Text>
      </View>
    )
  }