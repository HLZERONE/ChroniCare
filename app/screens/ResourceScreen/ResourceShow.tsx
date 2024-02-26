import React, { useLayoutEffect } from "react";
import { WebView } from "react-native-webview";
import { ResourceStackNavList } from "./ResourceTypes";
import { RouteProp } from "@react-navigation/native";


interface ResourceProps {
    resourceTitle: string,
    content: string,
}

type ResourceShowRouteProp = RouteProp<ResourceStackNavList, 'ResourceShow'>;

type Props = {
    route: ResourceShowRouteProp;
  };

const ResourceShow: React.FC<Props> = ({ route }) => {
    const { resourceTitle, content } = route.params;
    useLayoutEffect(() => {
        console.log("ResourceShow: " + resourceTitle);
    }, [resourceTitle]);

    return (
        <WebView source={{ html: content }}/>
    );
};

export default ResourceShow;