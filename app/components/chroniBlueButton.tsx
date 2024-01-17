import { Pressable } from "react-native"
import { Text } from "react-native";
import { StyleSheet } from "react-native";

function ChroniBlueButton(props: any){
    return(
        <Pressable onPress={(props.action)} style={{backgroundColor: "#1EAFB3",
         marginHorizontal: 4,
          marginVertical: 4,
          borderRadius:10,
          padding:5,
          height:30,}}>
            <Text style={{color: "#FFFFFF", justifyContent: 'center', textAlign: 'center'}}>{props.name}</Text>
        </Pressable>
    )
}


export default ChroniBlueButton;