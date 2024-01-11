import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable } from "react-native";
import React, { useState } from "react";
import { SignIn } from "../../FirebaseConfig";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import ChroniBlueButton from "../components/chroniBlueButton";


interface RouterProps{
    navigation: NavigationProp<any, any>;
}

const Login = ({navigation}: RouterProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const signIn = async () => {
        setLoading(true);
        try {
            SignIn(email, password);
        } catch (error: any) {
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
                    <ChroniBlueButton name="Sign In" action={signIn}></ChroniBlueButton>
                    <Pressable onPress={()=>navigation.navigate('Signup')} style={{ backgroundColor: "#FFFFFF", marginHorizontal: 4, marginVertical: 4, }}>
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