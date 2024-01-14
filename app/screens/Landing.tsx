import { useState, } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { View, Text, StyleSheet } from "react-native";
import DashboardNav from "../navigations/dashboardNav";


const Signup = () => {


    return(
        <View>
            <Text style={styles.constainer}>Landing, {FIREBASE_AUTH.currentUser?.email}</Text>
        </View>
    )

}

export default Signup;

const styles = StyleSheet.create({
    constainer: {

        justifyContent: 'center',
        alignContent: 'center',
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