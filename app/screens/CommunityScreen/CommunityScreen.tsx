import React from 'react';
import {ScrollView, Text, View} from 'react-native';

const Community = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Communities</Text>
      <Text>Treading</Text>
      <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    ></ScrollView>
    <Text>Joined Communities</Text>

    </View>
  );
};
export default Community;