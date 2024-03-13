import React, { useEffect, useLayoutEffect } from 'react';
import {ScrollView, View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResourceEntry from '../../components/Resources/ResourceEntry';
import { useNavigation } from '@react-navigation/native';

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

  useLayoutEffect(() => {
    getContentCollectionByCategoryIds(CATEGORY_IDS).then((data) => {
      const resources = data.Result.Resources.Resource;
      const sections: Response[] = [];
      resources.forEach((resource: any) => {
        resource.Sections.section.forEach((section: any) => {
          sections.push({
            title: resource.Title + ' - ' + section.Title,
            content: section.Content,
            description: section.Description,
          });
        });
      });
      setSections(sections);
      setLoading(false);
    });
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