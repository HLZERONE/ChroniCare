import React, { useEffect, useLayoutEffect } from 'react';
import {ScrollView, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResourceEntry from '../../components/Resources/ResourceEntry';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HEALTHGOV_API = "https://health.gov/myhealthfinder/api/v3/topicsearch.json";
const CATEGORY_IDS = [15, 16, 18]

interface Response {
  content: string,
  title: string,
  description: string,
}

const getContentCollectionByCategoryIds = async (categoryIds: number[]) => {
  const url = new URL(HEALTHGOV_API);
  url.searchParams.append('lang', 'en');
  categoryIds.forEach((categoryId) => {
    url.searchParams.append('categoryId', categoryId.toString());
  });
  const response = await fetch(HEALTHGOV_API);
  const data = await response.json();
  return data;
}

const Resource = () => {
  const [sections, setSections] = React.useState<Response[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    // Function to fetch and process data
    const fetchData = async () => {
      try {
        // Attempt to retrieve cached data
        const cachedSections = await AsyncStorage.getItem('sectionsCache');
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
          await AsyncStorage.setItem('sectionsCache', JSON.stringify(newSections));
        }
      } catch (error) {
        console.error(error);
        setLoading(false); // Ensure loading is set to false in case of error
      }
    };

    fetchData();
  }, []);

  return (
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(117, 196, 205, 0.19)',
      }}>
        {
          loading ? (
            <View>
              <Text>Loading...</Text>
            </View>
          ) : (
            
            <ScrollView>
            {
              sections.map((section, index) => {
                return (
                  <ResourceEntry key={index} title={section.title} content={section.content} description={section.description}/>
                );
              })
            }
          </ScrollView>
          )
        }
      </View>
  );
};
export default Resource;
{/* <ScrollView>
  {
    sections.map((section, index) => {
      return (
        <ResourceEntry key={index} title={section.title} content={section.content} description={section.description}/>
      );
    })
  }
</ScrollView> */}