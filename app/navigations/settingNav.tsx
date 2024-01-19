
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { View, Text, Button } from 'react-native';
import { SignOut } from '../../FirebaseConfig';
import ChroniBlueButton from '../components/chroniBlueButton';

const dashboardStack = createNativeStackNavigator();

export default function SettingNav() {
    return (
      <View>
        <Text>Setting Page</Text>
        <ChroniBlueButton onPress={SignOut}> Sign out</ChroniBlueButton>
      </View>
    )
  }