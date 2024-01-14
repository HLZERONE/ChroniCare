import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SignUp } from "../../FirebaseConfig";
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import ChroniBlueButton from "../components/chroniBlueButton";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)

    const signUp = async () => {
        setLoading(true);
        try {
            SignUp(email, password);
        } catch (error: any) {
            alert('Sign up failed: ' + error.message);
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
               <ChroniBlueButton name='Sign Up' action={signUp}></ChroniBlueButton>


            )}

        </View>
    )

}

export default Signup;

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