import React, { useState, useEffect } from "react";
import { 
  View, 
  StyleSheet 
} from "react-native";
import Lottie from "lottie-react-native";

import AnimationService from "../../../Services/AnimationService"

export default function LifeStatus({ mindHabit, moneyHabit, bodyHabit, funHabit }) {

  const [mind, setMind] = useState();
  const [money, setMoney] = useState();
  const [robot, setRobot] = useState();

  useEffect(() => {
    AnimationService.animationStatus(
      mindHabit?.progressBar,
      moneyHabit?.progressBar,
      bodyHabit?.progressBar,
      funHabit?.progressBar,
      setMind,
      setMoney,
      setRobot
    );
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);
  
  return (
    <View style={styles.container}>
      <Lottie style={styles.educationAnim} source={mind} autoPlay loop />
      <Lottie style={styles.financeAnim} source={money} autoPlay loop />
      <Lottie style={styles.robotAnim} source={robot} autoPlay loop/>
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