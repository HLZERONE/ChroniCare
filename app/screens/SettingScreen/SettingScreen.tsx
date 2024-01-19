import React from 'react';
import { View, Text } from 'react-native';
import { SignOut } from '../../../FirebaseConfig';
import ChroniBlueButton from '../../components/chroniBlueButton';

const Setting = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>This is the Setting Screen</Text>
      <ChroniBlueButton onPress={SignOut}> Sign out</ChroniBlueButton>
    </View>
  );
};
export default Setting;