import { View, Text, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import questions from "./questions";
import pb from "../libs/pocketbase";

const Question = ({ navigation }) => {
  const [ans, setAns] = useState(false);
  const [qNum, setqNum] = useState(0);
  const [coin, setCoin] = useState(0);
  const [user, setUser] = useState("");
  const userId = pb.authStore.model.id;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const record = await pb.collection("users").getOne(userId);
    setUser(record);
  };

  const upDateCoin = async() =>{
    const up = user.coin += coin
    const data = {
      coin: up,
    };
    await pb.collection("users").update(userId, data);
  }

  const check = async (checkans) => {
    let num = qNum;
    let checknum =questions.length-1
    if (checknum == num) {
      upDateCoin()
      navigation.navigate("HomePage");
      setCoin(0);
      setqNum(0);
    } else {
      if (questions[num].ans == checkans) {
        Alert.alert("", "Correct");
        setCoin(coin + 1);
        setqNum(num + 1);
        return;
      }
      Alert.alert("", "Incorrect!!");
      setqNum(num + 1);
    }
  };

  return (
    <>
      <View
        style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.headerQuestion}>Question</Text>
      </View>
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={{fontSize:30}}>{questions[qNum]?.question}</Text>
        <Text style={{fontSize:20}}>MBA coin : {coin}</Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 6,
        }}
      >
        <View style={{ width: 150 }}>
          <Button
            title="True"
            color="green"
            onPress={() => {
              let copyAns = true;
              setAns(copyAns);
              check(copyAns);
            }}
          />
        </View>

        <View style={{ width: 150 }}>
          <Button
            title="false"
            color="red"
            onPress={() => {
              let copyAns = false;
              setAns(copyAns);
              check(copyAns);
            }}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  headerQuestion: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 0,
    padding: 12,
    color: "red",
  },
});
export default Question;
