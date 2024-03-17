import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 

type JoinState = {
  ifJoined: boolean;
  onPress: () => void;
};

const JoinButton: React.FC<JoinState> = ({ ifJoined, onPress }) => {
  const [buttonText, setButtonText] = useState(ifJoined ? "Leave" : "Join");

  const handlePress = () => {
    onPress();
    setButtonText((currentText) => (currentText === "Join" ? "Leave" : "Join"));
  };

  return (
    <Pressable onPress={handlePress} style={styles.joinButton}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={ifJoined ? "logout" : "login"} size={14} color="#1EAFB3" />
      </View>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
};

export default JoinButton;

const styles = StyleSheet.create({
  joinButton: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#1EAFB3",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#FFFFFF",
    marginLeft: 4,
  },
  iconContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    padding: 2,
  },
});
