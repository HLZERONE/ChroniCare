import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Community from "../screens/CommunityScreen/CommunityScreen";
import SingleCommunityScreen from "../screens/CommunityScreen/SingleCommunityScreen";
import { CommunityStackNavList } from "../screens/CommunityScreen/CommunityTypes";
import PostScreen from "../screens/CommunityScreen/PostScreen";
import CreatePostPage from "../screens/CommunityScreen/CreatePost";
import CreateReplyPage from "../screens/CommunityScreen/CreateReply";
import SearchResult from "../screens/CommunityScreen/SearchResult";
import { CommunityProvider } from "../providers/CommunityProvider";

const communityStack = createNativeStackNavigator<CommunityStackNavList>();

const CommunityScreen = () => {
	return (
		<CommunityProvider>
			<communityStack.Navigator>
				<communityStack.Screen
					name="CommunityScreen"
					component={Community}
					options={{ headerShown: false }}
				/>
				<communityStack.Screen
					name="SingleCommunityScreen"
					component={SingleCommunityScreen}
				></communityStack.Screen>
				<communityStack.Screen
					name="PostScreen"
					component={PostScreen}
				></communityStack.Screen>
				<communityStack.Screen
					name="CreatePostPage"
					component={CreatePostPage}
				></communityStack.Screen>
				<communityStack.Screen
					name="CreateReplyPage"
					component={CreateReplyPage}
				></communityStack.Screen>
				<communityStack.Screen name = 'SearchResult' component={SearchResult}></communityStack.Screen>
			</communityStack.Navigator>
		</CommunityProvider>
	);
};

export default CommunityScreen;
