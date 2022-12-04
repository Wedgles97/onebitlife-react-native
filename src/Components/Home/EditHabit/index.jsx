import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function EditHabit({ habit, frequency, habitArea, checkColor }) {
  
  const navigation = useNavigation();

  function handleEdit() {
    navigation.navigate("HabitPage", {
      create: false,
      habit,
    });
  }

  function handleCheck() {
    console.log(`Clicando no check do ${habit?.habitArea}`);
  }

  const textNotification =
  habit?.habitNotificationTime == null
    ? `Sem notificação - ${habit?.habitFrequency}`
    : `${habit?.habitNotificationTime} - ${habit?.habitFrequency}`;

  return (
    <TouchableOpacity
    style={styles.button}
      activeOpacity={0.9}
      onPress={handleEdit}
    >
      <View style={styles.habitText}>
        <Text style={styles.habitTitle}>{habit?.habitName}</Text>
        <Text style={styles.habitFrequency}>{textNotification}</Text>
      </View>
      <TouchableOpacity
        style={[styles.check, { borderColor: checkColor }]}
        onPress={handleCheck}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#151515",
    borderRadius: 5,
    width: 320,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  habitTitle: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  habitFrequency: {
    color: "#ffffff",
  },
  check: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
});