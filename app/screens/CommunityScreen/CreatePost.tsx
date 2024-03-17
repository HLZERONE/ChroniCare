import { useEffect, useState } from "react"
import { ScrollView, TextInput, View, Text, Pressable, StyleSheet } from "react-native"
import { createPost } from "../../firebaseConnect/Forum";
import { curUserInfo } from "../../firebaseConnect/CurrentUserInfo";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Community from "../../firebaseConnect/data/Community";

interface CreatePostPageRouteParams {
    cummunity: Community;
}

const CreatePostPage = () =>{
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: CreatePostPageRouteParams }, 'params'>>();
    const {cummunity} = route.params;

    const onSubmit = () => {
        createPost(cummunity.id, title, content, curUserInfo).then(() => {
            navigation.goBack();
        }).catch((e) => {
            console.log("Error creating post: " + e);
        });
    }

    return(
        <ScrollView style={{backgroundColor: 'rgba(117, 196, 205, 0.19)'}}>
            <View style={styles.headerView}>
            <Text > {cummunity.name}</Text>
            <Pressable style={styles.postButton} 
            onPress={onSubmit}> 
                <Text style={styles.postText}>Post</Text>
            </Pressable>
            </View>

            <TextInput placeholder="Title" style={styles.textmargin}  value={title} onChangeText={setTitle}>
            </TextInput>

            <TextInput placeholder="your contents here" style={styles.textmargin} value={content}  onChangeText={setContent}>
            </TextInput>

        </ScrollView>
    )
}

export default CreatePostPage;

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