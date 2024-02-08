import { RouteProp } from "@react-navigation/native";
import { CommunityStackNavList } from "./CommunityTypes";
import { View, Text } from "react-native";




type PostScreenRouteProp = RouteProp<CommunityStackNavList, 'PostScreen'>;

type Props = {

    route: PostScreenRouteProp;
  };

const PostScreen = ({ route }: Props)=>{
    const postID = route.params.postID
    return(
        <View>
            <Text>{postID}</Text>
        </View>
    )
}

export default PostScreen;
