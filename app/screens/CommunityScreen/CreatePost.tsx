import { useEffect, useState } from 'react';
import { ScrollView, TextInput, View, Text, Pressable, StyleSheet } from 'react-native';
import { createPost } from '../../firebaseConnect/Forum';
import { curUserInfo } from '../../firebaseConnect/CurrentUserInfo';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

interface CreatePostPageRouteParams {
    cummunityID: string;
}

const CreatePostPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: CreatePostPageRouteParams }, 'params'>>();
    const { cummunityID } = route.params;

    const onSubmit = () => {
        createPost(cummunityID, title, content, curUserInfo).then(() => {
            navigation.goBack();
        }).catch((e) => {
            console.log('Error creating post: ' + e);
        });
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerView}>
                <Text style={styles.headerText}>Create Post</Text>
                <Pressable style={styles.postButton} onPress={onSubmit}>
                    <Text style={styles.postText}>Post</Text>
                </Pressable>
            </View>

            <TextInput 
                placeholder="Title" 
                style={styles.input}  
                value={title} 
                onChangeText={setTitle}
                placeholderTextColor="#666"
            />

            <TextInput 
                placeholder="Your contents here" 
                style={[styles.input, styles.contentInput]} 
                value={content}  
                onChangeText={setContent}
                placeholderTextColor="#666"
                multiline
                numberOfLines={4}
            />
        </ScrollView>
    );
};

export default CreatePostPage;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9FAFB',
        flex: 1,
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginTop: '6%',
        marginBottom: '4%',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    postButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#1EAFB3',
    },
    postText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: '5%',
        marginTop: '4%',
        fontSize: 16,
        color: '#333',
    },
    contentInput: {
        minHeight: 120, 
        textAlignVertical: 'top', 
    },
});
