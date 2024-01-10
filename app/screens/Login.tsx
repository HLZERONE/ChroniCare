import { View, Text } from 'react-native'
import { FIREBASE_AUTH } from '../../firebaseConfig'
import React from 'react'

const Login = () => {
    const auth = FIREBASE_AUTH;
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login