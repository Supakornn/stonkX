import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Pressable,
  Alert,
} from "react-native";

import pb from "../libs/pocketbase";

export default function Detail({ navigation, route }) {
  const { name, price, id, url } = route.params;
  const [user, setUser] = useState("");
  const [nft, setNft] = useState("");
  const userId = pb.authStore.model.id;

  useEffect(() => {
    getUser();
    getNft();
  }, []);

  const getUser = async () => {
    const record = await pb.collection("users").getOne(userId);
    setUser(record);
  };

  const getNft = async () => {
    const record = await pb.collection("nfts").getOne(id);
    setNft(record);
  };

  const upDateCoin = async () => {
    const up = user.coin - price;
    const data = {
      coin: up,
    };
    await pb.collection("users").update(userId, data);
    const nftData = {
      sold: true,
    };
    await pb.collection("nfts").update(id, nftData);
  };

  const buyed = () => {
    if (user.coin < price) {
      Alert.alert("You dont have enough coin");
    } else {
      Alert.alert("Successfully buying");
      upDateCoin();
      navigation.navigate("HomePage");
    }
  };

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      <View style={{ padding: 18, paddingTop: 20, justifyContent: "center" }}>
        <StatusBar style="auto" />
        <Image
          style={{ width: 250, height: 250, alignSelf: "center" }}
          source={{
            uri: url,
          }}
        />

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={Styles.headertitle}>{name}</Text>
          </View>

          <View style={{ justifyContent: "space-evenly" }}>
            <Text style={[Styles.headertitle, { marginRight: 5 }]}>
              Price: {price}
            </Text>
          </View>
        </View>
      </View>
      {nft.sold ? (
         <View style={{ padding: 12, flex: 0.5, position: "relative" }}>
         <Pressable style={[Styles.ButtonStyle, {backgroundColor: 'red'}]}>
           <Text
             style={{
               color: "white"
               ,
             }}
           >
             Sold Out
           </Text>
         </Pressable>
       </View>
      ) : (
        <View style={{ padding: 12, flex: 0.5, position: "relative" }}>
          <Pressable style={[Styles.ButtonStyle]} onPress={buyed}>
            <Text
              style={{
                color: "#000000",
              }}
            >
              Buy
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  headertitle: {
    marginLeft: 5,
    marginTop: 10,
    fontSize: 22,
    fontWeight: "bold",
  },

  inputLabel: {
    padding: 12,
    paddingBottom: 0,
  },

  smalltext: {
    marginLeft: 10,
    fontWeight: "bold",
    opacity: 0.7,
  },

  ButtonStyle: {
    alignSelf: "center",
    backgroundColor: "#E5C11D",
    paddingHorizontal: 100,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,

    // color: '#FFFFFF'
    // borderBottomLeftRadius: 15,
    // borderTopRightRadius: 15,
  },

  NameLabel: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
