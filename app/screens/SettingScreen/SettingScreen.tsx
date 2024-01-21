import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { currentUser, SignOut } from '../../firebaseConnect/Auth';
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
      <Pressable onPress={SignOut}>
        <Text> Sign Out</Text>
      </Pressable>
    </View>
  );
};
export default Setting;