import { Ionicons } from "@expo/vector-icons";
import React, { useLayoutEffect, useState } from "react";
import {
	ScrollView,
	Text,
	View,
	StyleSheet,
	TextInput,
	FlatList,
} from "react-native";
import CommunityTab from "../../components/communityTab";
import { CommunityStackNavList } from "./CommunityTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import CommunityModel from "../../firebaseConnect/data/Community";
import {
	getCommunities,
	getCurrentUserJoinedCommunities,
} from "../../firebaseConnect/Forum";
import TabBar from "../../components/tabBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCommunityContext } from "../../providers/CommunityProvider";
import { search } from "../../firebaseConnect/Search";

type CommunitiesNavigationProp = StackNavigationProp<
	CommunityStackNavList,
	"SingleCommunityScreen"
>;

type Props = {
	navigation: CommunitiesNavigationProp;
};

const Community = ({ navigation }: Props) => {
	const [searchValue, setSearchValue] = useState("");
	const [communities, setCommunities] = useState<CommunityModel[]>([]);
	const { joinedCommunities, updateJoinedCommunities } = useCommunityContext();

	const handleSearchAction = () => {
		search(searchValue).then((result) => {
			navigation.navigate("SearchResult", { communities: result });
			console.log(result);
		});
	};
	useLayoutEffect(() => {
		// populate the communities
		getCommunities()
			.then((communities: CommunityModel[]) => {
				setCommunities(communities);
			})
			.catch((e) => {
				console.log("Error getting communities: " + e);
			});
		getCurrentUserJoinedCommunities()
			.then((communities: CommunityModel[]) => {
				updateJoinedCommunities(communities);
			})
			.catch((e) => {
				console.log("Error getting joined communities: " + e);
			});
		return () => {};
		// We might need to add a dependency array here, but I'm not sure what it would be
	}, []);

	const communityAction = (community: CommunityModel) => {
		navigation.navigate("SingleCommunityScreen", {
			community: community,
		});
	};

	const handleSearchChange = (text: React.SetStateAction<string>) => {
		setSearchValue(text);
	};
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={styles.container}>
				<Text style={styles.header}>Communities</Text>
				<View style={styles.searchContainer}>
					<Ionicons
						name="search"
						size={30}
						color="#4D4D99"
						style={styles.searchIcon}
					/>
					<TextInput
						placeholder="Search symptoms, medications..."
						style={styles.searchInput}
						placeholderTextColor="#4D4D99"
						value={searchValue}
						onChangeText={handleSearchChange}
						onSubmitEditing={handleSearchAction}
						blurOnSubmit={true}
					/>
				</View>

				<Text style={styles.subHeader}>Trending</Text>
				<ScrollView
					horizontal={true}
					style={styles.horizontalScrollBox}
					showsHorizontalScrollIndicator={false}
				>
					{communities.map((community, index) => (
						<CommunityTab
							ifJoined={false}
							action={() => communityAction(community)}
							community={community}
							key={index}
						/>
					))}
				</ScrollView>

				<Text style={styles.subHeader}>Joined Communities</Text>
				{joinedCommunities.length === 0 ? (
					<Text style={styles.emptyMessage}>
						You have not joined any communities yet.
					</Text>
				) : (
					<FlatList
						data={joinedCommunities}
						renderItem={({ item }) => (
							<CommunityTab
								ifJoined={true}
								action={() => communityAction(item)}
								community={item}
							/>
						)}
						keyExtractor={(item) => item.id.toString()}
						numColumns={2}
						contentContainerStyle={styles.listContainer}
						scrollEnabled={false} // Disable scrolling for the FlatList
					/>
				)}
			</ScrollView>

			<TabBar navigation={navigation} state={{ index: 1 }} />
		</SafeAreaView>
	);
};
export default Community;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(117, 196, 205, 0.19)",
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		marginVertical: 20,
		marginLeft: 20,
	},
	subHeader: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 20,
		marginLeft: 20,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "rgba(80, 208, 199, 0.50)",
		borderRadius: 24,
		borderWidth: 2,
		borderColor: "#1EAFB3",
		marginHorizontal: 20,
		marginTop: 10,
		paddingHorizontal: 10,
	},
	searchIcon: {
		marginRight: 10,
	},
	searchInput: {
		flex: 1,
		paddingVertical: 10,
	},
	horizontalScrollBox: {
		paddingLeft: 20,
		marginTop: 10,
		minHeight: 200,
	},
	listContainer: {
		padding: 10, // Add padding around the list for spacing
	  },
	emptyMessage: {
		textAlign: "center",
		marginTop: 20,
		fontSize: 16,
		color: "#666", // This is just an example color, adjust as needed
	},
});
