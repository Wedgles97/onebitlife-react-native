import React from "react";
import { 
  View, 
  StyleSheet 
} from "react-native";

import Lottie from "lottie-react-native";

export default function LifeStatus() {
  /*
    Status:
      100 - Máximo
      50  - Médio
      25  - Baixo
      00  - Curto (Acabou o Game)
      No Robô, nós temos primeiros fFelicidade e Depois a Saúde xx-xx
  */

  return (
    <View style={styles.container}>
      <Lottie 
        style={styles.educationAnim}
        source={require("../../../assets/education/education-100.json")}
        autoPlay
        loop
      />
      <Lottie 
        style={styles.financeAnim}
        source={require("../../../assets/money/money-100.json")}
        autoPlay
        loop
      />
      <Lottie 
        style={styles.robotAnim}
        source={require("../../../assets/robot/robot-100-100.json")}
        autoPlay
        loop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 300,
  },
  robotAnim: {
    width: 190,
    marginTop: 30,
    marginLeft: 25,
  },
  educationAnim: {
    width: 100,
    marginTop: 50,
    marginLeft: 5,
    position: "absolute",
  },
  financeAnim: {
    width: 100,
    marginTop: 50,
    marginLeft: 95,
    position: "absolute",
  }
});