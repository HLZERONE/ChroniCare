import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { View, Text } from "react-native";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
            console.log(response);
        } catch (error: any) {
            console.log(error);
            alert('Sign in failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return(
        <View>
            <Text>Sign Up</Text>
        </View>
    )

}

export default Signup;

