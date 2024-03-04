import { AntDesign, FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabBar(props: any) {
    const { index } = props.state;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Community")} style={styles.imageContianer}>
      <MaterialCommunityIcons
          name={props.state.index === 0 ? "account-group" : "account-group-outline"} 
          size={30}
          color={props.state.index === 1 ? 'blue' : 'grey'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("FindDoctor")} style={styles.imageContianer}>
      <FontAwesome5
          name="stethoscope"
          size={24}
          color={props.state.index === 2 ? 'blue' : 'grey'}
        />
      </TouchableOpacity>
      <View style={styles.polygonContainer}>
        
        <ImageBackground
          style={styles.polygon}
          source={require("../../assets/background.png")}
        >
          <TouchableOpacity onPress={() => props.navigation.navigate("Dashboar")}>
          <Image style={styles.polygon_child} source={require("../../assets/home.png")} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <TouchableOpacity onPress={() => props.navigation.navigate("SymptomTracker")} style={styles.imageContianer}>
      <MaterialCommunityIcons name="clipboard-pulse-outline" size={30} color={props.state.index === 3 ? 'blue' : 'grey'} />


      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigation.navigate("Setting")} style={styles.imageContianer}>
      <Ionicons
          name="settings-outline"
          size={28}
          color={index === 4 ? 'blue' : 'grey'}
        />
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    borderTopRightRadius: 60,
    borderTopLeftRadius: 40,
    height: 90,
  },
  imageContianer: {
    alignItems: "center",
  },
  polygonContainer: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  polygon: {
    width: 100,
    height: 125,
    bottom: -1,
    justifyContent: "center",
    alignItems: "center",
  },
  polygon_child: {
    bottom: 6,
    right: 2
  }
});