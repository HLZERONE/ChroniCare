import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import ChroniBlueButton from "../components/chroniBlueButton";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }



    return (
        <View style={styles.constainer}>
            <Text>Login</Text>
            <TextInput value={email} placeholder="Email" autoCapitalize="none" style={styles.input} onChangeText={(text) => { setEmail(text) }}></TextInput>
            <TextInput secureTextEntry={true} value={password} placeholder="Password" autoCapitalize="none" style={styles.input} onChangeText={(text) => { setPassword(text) }}></TextInput>
            {loading ? (<ActivityIndicator size="large" color="@0000ff" />) : (
                <View>
                    <ChroniBlueButton name="Sign In"></ChroniBlueButton>
                    <Pressable onPress={()=>{}} style={{ backgroundColor: "#FFFFFF", marginHorizontal: 4, marginVertical: 4, }}>
                        <Text style={{ color: "#1EAFB3", justifyContent: 'center', textAlign: 'center' }}>Sign Up</Text>
                    </Pressable>
                </View>


            )}

        </View>

    );
};

export default Login;

const styles = StyleSheet.create({
    constainer: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
})