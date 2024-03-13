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
    route: ResourceShowRouteProp,
    navigation: any
  };

const ResourceShow: React.FC<Props> = ({ route }) => {
    const { resourceTitle, content } = route.params;

    return (
        <WebView source={{ html: `
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <body>${content}</body>
        ` }}/>
    );
};

export default ResourceShow;