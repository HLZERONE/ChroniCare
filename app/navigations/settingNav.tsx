
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text } from 'react-native';

const dashboardStack = createNativeStackNavigator();

export default function SettingNav() {
    return (
      <View>
        <Text>Setting Page</Text>
      </View>
    )
  }