import React, { useCallback, useEffect, useRef } from "react";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";
import ResourceEntry from "../../components/Resources/ResourceEntry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";

const HEALTHGOV_API =
	"https://health.gov/myhealthfinder/api/v3/topicsearch.json";
const CATEGORY_IDS = [15, 16, 18];

interface Response {
	content: string;
	title: string;
	description: string;
}

const getContentCollectionByCategoryIds = async (categoryIds: number[]) => {
	const url = new URL(HEALTHGOV_API);
	url.searchParams.append("lang", "en");
	categoryIds.forEach((categoryId) => {
		url.searchParams.append("categoryId", categoryId.toString());
	});
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

const getContentCollectionByInput = async (input: string) => {
  const url = new URL(HEALTHGOV_API);
  url.searchParams.append("lang", "en");
  url.searchParams.append("keyword", input);
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const Resource = () => {
	const [sections, setSections] = React.useState<Response[]>([]);
	const [loading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const searchValueRef = useRef(searchValue);

  useEffect(() => {
    searchValueRef.current = searchValue; // Update ref to the latest value
  }, [searchValue]);

  const fetchDefaultResources = async () => {
    try {
      // Attempt to retrieve cached data
      const cachedSections = await AsyncStorage.getItem("defaultResourcesCache");
      if (cachedSections !== null) {
        setSections(JSON.parse(cachedSections));
        setLoading(false);
      } else {
        // Fetch data if no cache is found
        const data = await getContentCollectionByCategoryIds(CATEGORY_IDS);
        const resources = data.Result.Resources.Resource;
        const newSections: Response[] = [];
        resources.forEach((resource: any) => {
          resource.Sections.section.forEach((section: any) => {
            newSections.push({
              title: `${resource.Title} - ${section.Title}`,
              content: section.Content,
              description: section.Description,
            });
          });
        });
        setSections(newSections);
        setLoading(false);
        // Cache the new sections for future use
        await AsyncStorage.setItem(
          "defaultResourcesCache",
          JSON.stringify(newSections)
        );
      }
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading is set to false in case of error
    }
  }

	useEffect(() => {
		const fetchData = async () => {
      await fetchDefaultResources();
    };
    fetchData();
	}, []);

  const handleSearchChange = (input: string) => {
    setSearchValue(input);
    debouncedSearchChange();
  };

  const debouncedSearchChange = useCallback(_.debounce(async () => {
    const currentValue = searchValueRef.current;
    setLoading(true);
    if (currentValue.length > 0) {
      console.log("Fetching resources by input: ", currentValue);
      const data = await getContentCollectionByInput(currentValue);
      const resources = data.Result.Resources.Resource;
      const newSections: Response[] = [];
      console.log(resources[0].Title);
      resources.forEach((resource: any) => {
        resource.Sections.section.forEach((section: any) => {
          newSections.push({
            title: `${resource.Title} - ${section.Title}`,
            content: section.Content,
            description: section.Description,
          });
        });
      });
      setSections(newSections);
      setLoading(false);
    } else {
      console.log("Fetching default resources");
      await fetchDefaultResources();
    }
  }, 1000), []);

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "rgba(117, 196, 205, 0.19)",
			}}
		>
			{loading ? (
				<View>
					<Text>Loading...</Text>
				</View>
			) : (
				<ScrollView>
					<View style={styles.searchContainerContainer}>
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
              />
            </View>
          </View>
					{sections.map((section, index) => {
						return (
							<ResourceEntry
								key={index}
								title={section.title}
								content={section.content}
								description={section.description}
							/>
						);
					})}
				</ScrollView>
			)}
		</View>
	);
};
export default Resource;

const styles =  StyleSheet.create({
  searchContainer: {
    height: 64,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(80, 208, 199, 0.50)',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#1EAFB3',
    width: 342,
    marginVertical: '3%',
    opacity: 0.35,
  },
  searchContainerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: '5%',
  },
  searchInput: {
    color: '#4D4D99',
    fontWeight: 'bold',
    fontSize: 14,
    paddingVertical: '3%',
    flex: 1,
  },
});
