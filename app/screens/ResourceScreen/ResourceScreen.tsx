import React, { useLayoutEffect } from 'react';
import {ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResourceEntry from '../../components/Resources/ResourceEntry';
import { useNavigation } from '@react-navigation/native';

const HEALTHGOV_API = "https://health.gov/myhealthfinder/api/v3/topicsearch.json";
const CATEGORY_IDS = [15, 16, 18]

interface BlogResponse {
  content: string,
  title: string,
}

const getContentCollectionByCategoryIds = async (categoryId: [number]) => {
  const url = new URL(HEALTHGOV_API);
  url.searchParams.append('lang', 'en');
  url.searchParams.append('categoryId', categoryId);
  const response = await fetch(HEALTHGOV_API);
  const data = await response.json();
  return data;
}

const Resource = () => {
  const [blogs, setBlogs] = React.useState<BlogResponse[]>([]);

  useLayoutEffect(() => {
    getContentCollection().then((data) => {
      setBlogs(data.blog.slice(0, 20).map((blog: any) => {
        return {
          title: blog.title,
          content: blog.content,
        }
      }));
    });
  }, []);
  return (
    <SafeAreaView style={{
			flex: 1,
			backgroundColor: 'rgba(117, 196, 205, 0.19)',
		}}>
      <ScrollView>
        {
          blogs.map((blog, index) => {
            return (
              <ResourceEntry key={index} title={blog.title} content={blog.content}/>
            );
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
};
export default Resource;