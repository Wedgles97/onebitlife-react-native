import React from "react";
import {
  StyleSheet,
  Switch,
  Text,
  View
} from "react-native";

export default function Notification({ notificationToggle, setNotificationToggle }) {
  const toggleSwitch = () => {
    setNotificationToggle((previousState) => !previousState);
  }
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Notificação</Text>
        <Switch
          trackColor={{ false: "#ff0044", true: "#2dbe56" }}
          thumbColor={"#ffffff"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={notificationToggle}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  titleDisabled: {
    color: "#bbbb",
    fontSize: 20,
    marginRight: 10,
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    marginRight: 10,
  },
});