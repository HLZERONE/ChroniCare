import { RouteProp } from "@react-navigation/native";
import { CommunityStackNavList } from "./CommunityTypes";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import JoinButton from "../../components/joinButton";
import MessageTab from "./messageTab";




type PostScreenRouteProp = RouteProp<CommunityStackNavList, 'PostScreen'>;

type Props = {

    route: PostScreenRouteProp;
  };

const PostScreen = ({ route }: Props)=>{
    const {postID, communityID} = route.params
    const img = require('../../../assets/favicon.png');

    return(
        <View  style={styles.container}>
            <ScrollView>
                <View style={styles.headerArea}>
                    <Image source={img} resizeMode="contain"></Image>
                    <Text style={styles.title}>{communityID}</Text>
                    <Text style={styles.memberNum}>1563 members</Text>
                    <JoinButton ifJoined={true}></JoinButton>
                </View>
                <Text style={styles.description}>This is the First Post.</Text>

                <View style={styles.headerArea}>
                    <Text>by: </Text>
                    <Image source={img} style={styles.userImage}></Image>
                    <Text>A User</Text>
                </View>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</Text>
                <MessageTab poster='A User' 
                    message='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et'>
                </MessageTab>
                <MessageTab poster='A User' 
                    message='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et'>
                </MessageTab>
                <MessageTab poster='A User' 
                    message='Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et'>
                </MessageTab>




            </ScrollView>
        </View>
    )
}

export default PostScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(117, 196, 205, 0.19)',
      alignItems: 'center',
      padding: '2%',
    },
    headerArea: {
      paddingLeft:'2%',
      flexDirection: 'row',
      gap: 10
    },
    title: {
      fontWeight: '600',
      fontSize: 16,
      color: '#091F44',
      maxWidth:'40%',
  
    },
    memberNum: {
      fontWeight: '400',
      fontSize: 10,
      color:'rgba(, 0, 0, 0.5)'
    },
    description:{
      margin: '2%',
      textAlign:'left',
      fontWeight: '400',
      fontSize: 14,
      color: '#091F44',
    },
    userImage:{
        width:20,
        height:20
    }
  
  
  })