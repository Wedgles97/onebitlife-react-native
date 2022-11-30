import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";

export default function CreateHabit({ habitArea, borderColor }) {
  function handleCreate() {
    console.log(`Botão da área clicado: ${habitArea}`);
  }

  return (
    <TouchableOpacity
      style={[styles.button, { borderColor: borderColor }]}
      activeOpacity={0.8}
      onPress={handleCreate}
    >
      <Text style={styles.habitTitle}>
        Adicionar meta {habitArea === "Mente" ? "da" : "do"} {habitArea}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 315,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderStyle: "dotted",
    borderColor: "#ffffff",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  habitTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});