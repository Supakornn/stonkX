import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import React from "react";

const Card = ({ navigation, id, name, url, price }) => {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          flex: 0.07, //Thickness Bar
          marginTop: 20,
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <View style={{}}>
          <Image
            source={{
              uri: url,
            }}
            style={{ width: 200, height: 200, marginTop: 50 }}
          />
          <Text style={{fontSize:18, fontWeight:'bold'}}>Name : {name}</Text>
          <Text style={{fontSize:18, fontWeight:'bold'}}>Price : {price}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
