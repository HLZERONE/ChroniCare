import { View, Text, StyleSheet } from "react-native";
import { convert } from "html-to-text";


interface ResourceEntryProps {
    title: string,
    content: string,
}

const ResourceEntry:  React.FC<ResourceEntryProps> = ({ title, content }) => {
  return (
    <View style={styles.entry}>
        <Text style={styles.entryTitle}>{title}</Text>
        <Text style={styles.entryDescription}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    
  },
  entryTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  entryDescription: {
    fontSize: 16,
    },
});

export default ResourceEntry;