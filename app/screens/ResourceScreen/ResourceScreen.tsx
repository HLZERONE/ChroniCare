import React, { useLayoutEffect } from 'react';
import {ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ResourceEntry from '../../components/Resources/ResourceEntry';
import { useNavigation } from '@react-navigation/native';


interface BlogResponse {
  content: string,
  title: string,
}

const getContentCollectionByType = async (type: string) => {
  // https://www.healthcare.gov/api/:content-type.json
  const response = await fetch(`https://www.healthcare.gov/api/${type}.json`);
  const data = await response.json();
  return data;
}

const Resource = () => {
  const [blogs, setBlogs] = React.useState<BlogResponse[]>([]);

  useLayoutEffect(() => {
    getContentCollectionByType('blog').then((data) => {
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