
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text } from 'react-native';

const dashboardStack = createNativeStackNavigator();

export default function ResourceNav() {
    return (
      <View>
        <Text>Resource Page</Text>
      </View>
    )
  }