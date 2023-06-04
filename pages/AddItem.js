import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import pb from "../libs/pocketbase"


const AddItem = ({ navigation }) => {
  const [nameItem, setNameItem] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const check = async () => {
    if (!nameItem || !price || !url) {
      Alert.alert("", "Please fill all input!");
      return;
    } else {
      const data = {
        url: url,
        name: nameItem,
        price: price,
      };
      await pb.collection("nfts").create(data);

      navigation.navigate("HomePage");
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ ...styles.headerTitle, marginBottom: 10 }}>
        Add new item
      </Text>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: url,
          }}
        />
      </View>
      <Text style={styles.inputLabel}>Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Your NFT name "
        onChangeText={setNameItem}
        value={nameItem}
      />
      <Text style={styles.inputLabel}>Price</Text>
      <TextInput
        style={styles.textInput}
        placeholder="What price? "
        onChangeText={setPrice}
        keyboardType="numeric"
        value={price}
      />
      <Text style={styles.inputLabel}>Link uri</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Link URL"
        onChangeText={setUrl}
      />
      <View style={{ padding: 10 }}>
        <Button title="Add NFT" onPress={check} />
      </View>
    </ScrollView>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    marginHorizontal: 12,
    borderWidth: 1,
    padding: 10,
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  inputLabel: {
    padding: 10,
    paddingBottom: 0,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
    marginBottom: 18,
  },
});
