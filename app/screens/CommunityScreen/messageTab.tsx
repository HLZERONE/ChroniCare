import { Pressable, View, Text, StyleSheet, Image } from "react-native"



const MessageTab = (props:any)=>{
    const img = require('../../../assets/favicon.png')
    const likeButton = require('../../../assets/likeButton.png');
    const dislikeButton = require('../../../assets/dislikeButton.png')
    const {action, poster, reply} = props

    const handleLike = ()=>{
        console.log("like button pressed")
    };

    const handleDisLike = ()=>{
        console.log("Dislike button pressed")
    };
    
    return(
            <View style={styles.tabcontainer}>
                <View style={styles.headerArea}>
                    <Image source={img} style={styles.userImage}></Image>
                    <Text>{poster.name}</Text>
                </View>
                <Text>
                    {reply.content}
                </Text>
                <View style={styles.bottomArea}>
                    <View style={styles.likeAndDislike}>
                        <Pressable onPress={handleLike}>
                            <Image source={likeButton} style={styles.likebutton}></Image>
                        </Pressable>

                        <View style={styles.divider} />

                        <Pressable onPress={handleDisLike}>
                            <Image source={dislikeButton} style={styles.likebutton}></Image>
                        </Pressable>
                    </View>
                    
                        <Pressable onPress={action} style={styles.pressableBox} >
                            <Text>Reply</Text>
                        </Pressable>
                </View>
            </View>


    )
}

export default MessageTab;

const styles = StyleSheet.create({
    tabcontainer:{
        margin: '2%',
        padding: '2%',
        backgroundColor: '#fff',
        borderRadius:16,
        maxHeight:'100%'
    },
    divider:{
        borderRightColor: '#000',
        borderRightWidth:1
    },
    likeAndDislike:{
        flexDirection:'row',
        gap:2,
        backgroundColor: 'rgba(87, 218, 179, 0.6)',
        borderWidth: 1,
        borderRadius: 24,
        borderColor:'#1EAFB3',
        justifyContent:'space-evenly',
        paddingHorizontal:3,
        paddingVertical:4,
        maxWidth:'25%',
        marginTop:3,
        minWidth:'24%'

    },
    likebutton:{
        width:24,
        height:24
    },
    bottomArea:{
        flexDirection:'row',
        alignItems:'center',
        gap:3,
        justifyContent:'space-between',
        paddingRight:'2%'
    },
    userImage:{
        width:20,
        height:20
    },
    headerArea:{
        flexDirection:'row',
        alignItems:'center',
        gap:3,
    },
    pressableBox:{
        width:50,
        height:25,
        alignItems:'center',
        justifyContent:'center',

    }
})