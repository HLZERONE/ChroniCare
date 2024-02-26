import React, { useLayoutEffect, useState } from "react";
import { WebView } from "react-native-webview";


interface ResourceProps {
    resourceTitle: string;
}

const getJsonFromHealthCareGov = async (title: string) => {
    // https://www.healthcare.gov/:post-title.json
    const response = await fetch(`https://www.healthcare.gov/${title}.json`);
    const data = await response.json();
    return data;
}

const ResourceShow: React.FC<ResourceProps> = ({ resourceTitle }) => {
    const [pageData, setPageData] = useState<any>();

    useLayoutEffect(() => {
        console.log("ResourceShow: " + resourceTitle);
        getJsonFromHealthCareGov(resourceTitle).then((data) => {
            setPageData(data);
        });
    }, [resourceTitle]);

    return (
        <WebView source={pageData.content}/>
    );
};