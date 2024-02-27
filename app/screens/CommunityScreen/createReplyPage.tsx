import { useState } from "react"
import { ScrollView, TextInput, View, Text, Pressable, StyleSheet } from "react-native"


const CreateReplyPage = () =>{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    return(
        <ScrollView style={{backgroundColor: 'rgba(117, 196, 205, 0.19)'}}>
            <View style={styles.headerView}>
            <Text >PosterID</Text>
            <Pressable style={styles.postButton} 
            onPress={()=>{console.log('postPressed')}}>
                <Text style={styles.postText}>Reply</Text>
            </Pressable>
            </View>

            <TextInput placeholder="Title" style={styles.textmargin}  value={title} onChangeText={setTitle}>
            </TextInput>

            <TextInput placeholder="your contents here" style={styles.textmargin} value={content}  onChangeText={setContent}>
            </TextInput>

        </ScrollView>
    )
}

export default CreateReplyPage;

const styles = StyleSheet.create({
    headerView:{
        flexDirection:'row',
        justifyContent: 'space-between',
        marginHorizontal:'5%',
        marginTop:'2%'
    },
    postButton:{
        paddingHorizontal:5,
        paddingVertical: 3,
        borderRadius:14,
        borderWidth:2,
        borderColor:'#1EAFB3',
        alignSelf:'center'
    },
    postText:{
        fontSize:14,
        color:'#000',

    },
    textmargin:{
        marginHorizontal:'5%'
    }
    
})