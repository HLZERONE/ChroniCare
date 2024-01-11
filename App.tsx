import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import Signup from './app/screens/Signup';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';
import Landing from './app/screens/Landing';

const Stack = createNativeStackNavigator()
const InnerStack = createNativeStackNavigator()

function InsideLayout() {
  return (
    <InnerStack.Navigator>
      <InnerStack.Screen name='Inner' component={Landing} options={{headerShown: false}} ></InnerStack.Screen>
    </InnerStack.Navigator>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {user ? (<Stack.Screen name="Inside" component={InsideLayout} options={{ headerShown: false }}></Stack.Screen>) : (<><Stack.Screen name="Login" component={Login} options={{ headerShown: false }}></Stack.Screen><Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}></Stack.Screen></>)}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
