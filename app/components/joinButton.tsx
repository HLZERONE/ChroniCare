import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native"

type joinState = {
    ifJoined:boolean
}


function JoinButton({ifJoined}: joinState){

    const [buttonText, setButtonText] = useState(ifJoined ? 'Join' :'Joined');


    const handlePress = () => {
      console.log('pressed');
      setButtonText((currentText) => (currentText === 'Join' ? 'Joined' : 'Join'));
    };

    return(
        <Pressable onPress={handlePress} 
        style={({pressed})=>[{backgroundColor: pressed ? 'rgba(87, 218, 179, 0.6)': 'rgba(87, 218, 179, 0.4)'}, styles.joinButton]}
        ><Text style={styles.joinedText}>{buttonText}</Text></Pressable>
    )
}

export default JoinButton;

const styles = StyleSheet.create({
    joinButton:{
        paddingHorizontal:5,
        paddingVertical: 3,
        borderRadius:14,
        borderWidth:2,
        borderColor:'#1EAFB3',
        alignSelf:'center'
    },
    joinText:{
        fontSize:14,
        color:'#fff',

    },
    joinedText:{
        fontSize:14,
        color:'#000',

    }
})