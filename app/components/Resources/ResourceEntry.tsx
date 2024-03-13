import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, Pressable } from "react-native";


interface ResourceEntryProps {
  title: string;
  content: string;
  description?: string;
}

const ResourceEntry: React.FC<ResourceEntryProps> = ({ title, content, description }) => {
  const navigation = useNavigation<any>(); // Specify the type of navigation as 'any'

  const onPress = () => {
    // Navigate to ResourceShow
    navigation.navigate("ResourceShow", {
      resourceTitle: title,
      content: content,
    });
  };

  return (
    <Pressable onPress={onPress} style={styles.entry}>
      <Text style={styles.entryTitle}>{title}</Text>
      <Text style={styles.entryDescription}>{description || 'No description'}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "white",
    opacity: 0.8,
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