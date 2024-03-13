import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native"

type joinState = {
    ifJoined:boolean
    onPress: () => void
}


function JoinButton({ifJoined, onPress}: joinState){

    const [buttonText, setButtonText] = useState(ifJoined ? 'Leave' :'Join');


    const handlePress = () => {
        onPress();
        setButtonText((currentText) => (currentText === 'Join' ? 'Leave' : 'Join'));
    };

    return(
        <Pressable onPress={handlePress} 
        style={({pressed})=>[{backgroundColor: pressed ? 'rgba(87, 218, 179, 0.6)': 'rgba(87, 218, 179, 0.4)'}, styles.joinButton]}
        
        ><Text style={styles.joinedText}>{buttonText}</Text>
        </Pressable>
    )
}

export default JoinButton;

const styles = StyleSheet.create({
    joinButton:{
        minWidth:60,
        minHeight:30,
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

    }
})