
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text } from 'react-native';

const dashboardStack = createNativeStackNavigator();

export default function CommunityNav() {
    return (
      <View>
        <Text>Community Page</Text>
      </View>
    )
  }