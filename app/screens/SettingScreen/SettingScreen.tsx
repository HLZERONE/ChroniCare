import { View, Text, Pressable } from 'react-native';
import {SignOut, currentUser } from '../../firebaseConnect/Auth';
import ChroniBlueButton from '../../components/chroniBlueButton';
import { getUserInfo } from '../../firebaseConnect/ProfileInfo';
import { curUserInfo } from '../../firebaseConnect/data/User';


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

      <Pressable onPress={() => getUserInfo(currentUser?.uid)}>
        <Text> get User Info</Text>
      </Pressable>
      <Text>
        {curUserInfo.firstName + " " + curUserInfo.lastName}
      </Text>
    </View>
  );
};
export default Setting;