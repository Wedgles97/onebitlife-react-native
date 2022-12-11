import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";

import LifeStatus from "../../Components/Common/LifeStatus"
import StatusBar from "../../Components/Home/StatusBar";
import CreateHabit from "../../Components/Home/CreateHabit";
import EditHabit from "../../Components/Home/EditHabit";
import ChangeNavigationService from "../../Services/ChangeNavigationService";
import HabitsService from "../../Services/HabitsService";
import CheckService from "../../Services/CheckService";
import DefaultButton from "../../Components/Common/DefaultButton";
import db from "../../Database";

export default function Home({ route }) {
  const navigation = useNavigation();
  const [mindHabit, setMindHabit] = useState();
  const [moneyHabit, setMoneyHabit] = useState();
  const [bodyHabit, setBodyHabit] = useState();
  const [funHabit, setFunHabit] = useState();

  const [robotDaysLife, setRobotDaysLife] = useState();
  const [checks, setChecks] = useState();
  const [gameOver, setGameOver] = useState(false);
  const today = new Date();

  function handleNavExplanation() {
    navigation.navigate("AppExplanation");
  }

  function handleGameOver() {
    navigation.navigate("Start");
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE habits;");
      tx.executeSql("DROP TABLE change_navigation;");
    });
  }

  const excludeArea = route.params?.excludeArea;

  useEffect(() => {
    // update habit
    HabitsService.findByArea("Mente").then((mind) => {
      setMindHabit(mind[0]);
    });
    HabitsService.findByArea("Financeiro").then((money) => {
      setMoneyHabit(money[0]);
    });
    HabitsService.findByArea("Corpo").then((body) => {
      setBodyHabit(body[0]);
    });
    HabitsService.findByArea("Humor").then((fun) => {
      setFunHabit(fun[0]);
    });

    // delete habit
    if (excludeArea) {
      if (excludeArea == "Mente") {
        setMindHabit(null);
      }
      if (excludeArea == "Financeiro") {
        setMoneyHabit(null);
      }
      if (excludeArea == "Corpo") {
        setBodyHabit(null);
      }
      if (excludeArea == "Humor") {
        setFunHabit(null);
      }
    }
    
    ChangeNavigationService.checkShowHome(1)
      .then((showHome) => {
        const month = `${today.getMonth() + 1}`.padStart(2, "0")
        const day = `${today.getDate()}`.padStart(2, "0")
        const formDate = `${today.getFullYear()}-${month}-${day}`
        const checkDays = new Date(formDate) - new Date(showHome.appStartData) + 1;
        if(checkDays === 0){
          setRobotDaysLife(checkDays.toString().padStart(2, "0"));
        } else {
          setRobotDaysLife(parseInt(checkDays / (1000 * 3600 * 24)));
        }
      })
      .catch((err) => console.log(err));
  }, [route.params]);

  useEffect(() => {
    CheckService.removeCheck(mindHabit, moneyHabit, bodyHabit, funHabit);
    CheckService.checkStatus(mindHabit, moneyHabit, bodyHabit, funHabit);
    const mindChecks = mindHabit ? mindHabit?.habitChecks : 0;
    const moneyChecks = moneyHabit ? moneyHabit?.habitChecks : 0;
    const bodyChecks = bodyHabit ? bodyHabit?.habitChecks : 0;
    const funChecks = funHabit ? funHabit?.habitChecks : 0;

    setChecks(mindChecks + moneyChecks + bodyChecks + funChecks);
    if(
      mindHabit?.progressBar === 0 || moneyHabit?.progressBar === 0 ||
      bodyHabit?.progressBar === 0 || funHabit?.progressBar === 0
    ) {
      setGameOver(true);
    }
  }, [mindHabit, moneyHabit, bodyHabit, funHabit]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          {!gameOver ? (
            <Text style={styles.dailyChecks}>
            ❤️ {robotDaysLife} {robotDaysLife === "01" ? "dia" : "dias"} - ✔️ {checks} {checks === 1 ? "Check" : "Checks"}
            </Text>
          ) : (
            <Text style={styles.gameOverTitle}>Game Over</Text>
          )}
          <LifeStatus 
            mindHabit={mindHabit}
            moneyHabit={moneyHabit}
            bodyHabit={bodyHabit}
            funHabit={funHabit}
          />

          <StatusBar
            mindHabit={mindHabit?.progressBar}
            moneyHabit={moneyHabit?.progressBar}
            bodyHabit={bodyHabit?.progressBar}
            funHabit={funHabit?.progressBar}
          />
          
          {!gameOver ? (
            <View>
              {mindHabit ? (
                <EditHabit habit={mindHabit} checkColor="#90b7f3" />
              ) : (
                <CreateHabit habitArea="Mente" borderColor="#90b7f3"/>
              )}

              {moneyHabit ? (
                <EditHabit habit={moneyHabit} checkColor="#85bb65"/>
              ) : (
                <CreateHabit habitArea="Financeiro" borderColor="#85bb65" />
              )}

              {bodyHabit ? (
                <EditHabit habit={bodyHabit} checkColor="#ff0044" />
              ) : (
                <CreateHabit habitArea="Corpo" borderColor="#ff0044" />
              )}

              {funHabit ? (
                <EditHabit habit={funHabit}checkColor="#fe7f23" />
              ) : (
                <CreateHabit habitArea="Humor" borderColor="#fe7f23" />
              )}

              <Text
                style={styles.explanationText}
                onPress={() => {
                  handleNavExplanation();
                }}
              >
                Ver explicação novamente
              </Text>
            </View>
          ) : (
            <View style={{ marginVertical: 40 }}>
              <DefaultButton
                buttonText={"Resetar o game"}
                handlePress={handleGameOver}
                width={250}
                height={50}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(21, 21, 21, 0.98)",
  },
  dailyChecks: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    marginTop: 40,
  },
  explanationText: {
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 25,
  },
  gameOverTitle: {
    marginVertical: 25,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  }
});