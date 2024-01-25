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
      <ChroniBlueButton name="Sign Out" action={SignOut}></ChroniBlueButton>

      <Text>
        {curUserInfo.firstName + " " + curUserInfo.lastName}
      </Text>
    </View>
  );
};
export default Setting;
