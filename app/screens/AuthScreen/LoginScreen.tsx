import { View, Text, StyleSheet, TextInput, ActivityIndicator, Pressable, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SignIn } from "../../firebaseConnect/Auth";
import { NavigationProp } from "@react-navigation/native";
import ChroniBlueButton from "../../components/chroniBlueButton";
import { MaterialCommunityIcons } from '@expo/vector-icons';



interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const Login = ({ navigation }: RouterProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const logo = require('../../../assets/chroniLogo.png');

    // Function to toggle the password visibility state 
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const signIn = async () => {
        setLoading(true);
        SignIn(email, password).catch((error) => {
            alert('Sign in failed: ' + error.message);
        }).finally(() => {
            setLoading(false);
        });
    }

    // FOR TEST PURPOSES ONLY
	useEffect(() => {
		setEmail("test@test.com");
		setPassword("testtest");
	}, []);

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo} resizeMode="contain"></Image>
            <View style={styles.inputBox}>
                <TextInput value={email}
                    placeholder="Email"
                    autoCapitalize="none"
                    style={{ borderColor: "#fff", width: "100%" }}
                    onChangeText={(text) => { setEmail(text) }}></TextInput>
            </View>
            <View style={styles.inputBox}>
                <TextInput secureTextEntry={!showPassword}
                    value={password} placeholder="Password"
                    autoCapitalize="none" style={{ borderColor: "#fff" , flex:1}}
                    onChangeText={(text) => { setPassword(text) }}></TextInput>
                <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={24}
                    color="#aaa"
                    onPress={toggleShowPassword}
                    style={{zIndex:1}}
                />
            </View>
            {loading ? (<ActivityIndicator size="large" color="@0000ff" />) : (
                <View style={styles.buttonContainer}>
                    <ChroniBlueButton name="Sign In" action={signIn}></ChroniBlueButton>
                    <Pressable onPress={() => navigation.navigate('Signup')} style={{ 
                        backgroundColor: "#FFFFFF", marginHorizontal: 4, marginVertical: 4, 
                        borderWidth:1,
                        borderColor: "#1EAFB3",
                        borderRadius: 10,
                        padding: 5}}>
                        <Text style={{ color: "#1EAFB3", justifyContent: 'center', textAlign: 'center' }}>Sign Up</Text>
                    </Pressable>
                </View>


            )}

        </View>

    );
};

export default Login;

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
        marginBottom:3
    },
    logo: {
        width: '80%',
        height: '50%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    buttonContainer:{
        flex:1,
        width:"80%",
        marginTop: 20
    }

})