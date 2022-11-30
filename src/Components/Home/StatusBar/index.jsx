import React from "react";
import {
  Image,
  StyleSheet,
  View
} from "react-native";

import { ProgressBar } from "react-native-paper";

export default function StatusBar() {
  return (
    <View style={styles.container}>
      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/educationIcon.png")}
        />
        <ProgressBar
          style={styles.progress}
          progress={1}
          color={"#90b7f3"}
        />
      </View>

      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/moneyIcon.png")}
        />
        <ProgressBar
          style={styles.progress}
          progress={0}
          color={"#85bb65"}
        />
      </View>

      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/bodyIcon.png")}
        />
        <ProgressBar
          style={styles.progress}
          progress={0}
          color={"#ff0043"}
        />
      </View>

      <View style={styles.statusBarContainer}>
        <Image
          style={styles.icon}
          source={require("../../../assets/icons/funIcon.png")}
        />
        <ProgressBar
          style={styles.progress}
          progress={0}
          color={"#fe7f23"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    padding: 20,
    backgroundColor: "#151515",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  statusBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  progress: {
    borderRadius: 10,
    width: 250,
    height: 8,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
});