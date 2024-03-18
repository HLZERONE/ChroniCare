import { useState } from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native"

type joinState = {
    ifJoined:boolean
    onPress: () => void
}


function JoinButton({ifJoined, onPress}: joinState){

    const [buttonText, setButtonText] = useState(ifJoined ? 'Leave' :'Join');
    const join = require("../../assets/join.png");
    const leave = require("../../assets/leave.png");


    const handlePress = () => {
        onPress();
        setButtonText((currentText) => (currentText === 'Join' ? 'Leave' : 'Join'));
    };

    return(
        <Pressable onPress={handlePress} 
        style={({pressed})=>[{backgroundColor: ifJoined ?
            (pressed ? 'rgba(87, 218, 179, 0.6)' : 'rgba(237, 175, 116, 0.8)') : //change this for the wanted color
            (pressed ? 'rgba(87, 218, 179, 0.6)' : 'rgba(87, 218, 179, 0.4)'),},
         styles.joinButton]}>
            {(ifJoined ? (<Image style={styles.iconStyle} source={leave}></Image>)
             : 
             (<Image style={styles.iconStyle} source={join}></Image>))}
            <Text style={styles.joinedText}>{buttonText}</Text>
        </Pressable>
    )
}

export default JoinButton;

const styles = StyleSheet.create({
    joinButton:{
        minWidth:60,
        minHeight:30,
        flexDirection:"row",
        paddingHorizontal:8,
        paddingVertical:3,
        borderRadius:14,
        borderWidth:2,
        borderColor:'#1EAFB3',
        alignItems:'center',
        justifyContent:"center"
    },
    joinText:{
        fontSize:14,
        color:'#fff',
        textAlignVertical:"center",
        textAlign:"center"
    },
    joinedText:{
        fontSize:14,
        color:'#000',
        textAlignVertical:"center",
        textAlign:"center"

    },
    iconStyle:{
        width:16,
        height:16,
        marginRight:5
    }
})