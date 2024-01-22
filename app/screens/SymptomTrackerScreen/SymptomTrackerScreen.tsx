import React from 'react';
import {Button, Text, View} from 'react-native';
import CurrentSymptoms from '../../components/SymptomTracker/CurrentSymptoms';

const SymptomTracker = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Symptom Tracker</Text>
      <Button title="+ Add Symptom" onPress={() => alert('Add Symptom Clicked')} />
      <CurrentSymptoms symptoms={[]} />
    </View>
  );
};
export default SymptomTracker;