import { useState } from "react";
import { SignUp } from "../../firebaseConnect/Auth";
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator } from "react-native";
import ChroniBlueButton from "../../components/chroniBlueButton";


const Signup = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPW, setConfirmPW] = useState('');
    const [loading, setLoading] = useState(false);

    const signUp = async () => {
        setLoading(true);
        SignUp(firstname, lastname, email, password, confirmPW).catch((error) => {
            alert('Sign up failed: ' + error);
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headBox}>
                <Text style={styles.blueText}>Welcome!</Text>
                <Text style={styles.thickText}>Create Account</Text>
            </View>
            <TextInput value={firstname} placeholder="First Name" autoCapitalize="sentences"
                onChangeText={(text) => { setFirstname(text) }} style={styles.inputBox}></TextInput>
            <TextInput value={lastname} placeholder="Last Name" autoCapitalize="sentences"
                onChangeText={(text) => { setLastname(text) }} style={styles.inputBox}></TextInput>
            <TextInput value={email} placeholder="Email" autoCapitalize="none" style={styles.inputBox}
                onChangeText={(text) => { setEmail(text) }}></TextInput>
            <TextInput secureTextEntry={true} value={password} placeholder="Password" autoCapitalize="none"
                style={styles.inputBox} onChangeText={(text) => { setPassword(text) }}></TextInput>
            <TextInput secureTextEntry={true} value={confirmPW} placeholder="Confirm Password" autoCapitalize="none"
                style={styles.inputBox} onChangeText={(text) => { setConfirmPW(text) }}></TextInput>

            <View style={styles.buttonContainer}>
                {loading ? (<ActivityIndicator size="large" color="@0000ff" />) : (
                    <ChroniBlueButton name='Sign Up' action={signUp}></ChroniBlueButton>


                )}
            </View>

        </View>
    )

}

export default Signup;

const styles = StyleSheet.create({
    inputBox: {
        borderColor: "#D2D2D2",
        borderWidth: 1,
        backgroundColor: "#fff",
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginBottom: 3
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    buttonContainer: {
        flex: 1,
        width: "80%",
        marginTop: 20
    },
    headBox: {
        padding: "10%",
        height: "30%",
        width:"100%",
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'

    },
    blueText: {
        color: "#1EAFB3",
        fontSize:24
    },
    thickText: {
        fontWeight: "bold",
        fontSize:28
    }
})