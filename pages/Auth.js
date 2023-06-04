import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  StatusBar,
} from "react-native";
import pb from "../libs/pocketbase";

function Auth({ navigation }) {
  const [loginMode, setLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setconpassword] = useState("");
  const [user, setUser] = useState(null);

  const handleRegister = async () => {
    if (!username || !password || !email || !conpassword) {
      Alert.alert("", "Username or Password or email must not be empty!!!");
      return;
    }

    const records = await pb.collection("users").getFullList({
      filter: `username = "${username}" || email = "${email}"`,
    });

    if (records.length > 0) {
      Alert.alert("", "Your Username or Email has been use");
    } else {
      const data = {
        username: username,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: conpassword,
      };
      await pb.collection("users").create(data);
      setLoginMode(true);
    }
  };

  const handleLogin = async (e) => {
    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(username, password);
    //   setUser(pb.authStore.model);
      navigation.navigate("HomePage");
      setEmail("")
      setPassword("")
      setUsername("")
      setconpassword("")
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={{ padding: 18, flex: 1, justifyContent: "center" }}>
      <StatusBar animated={true} />
      <View>
        <Image
          style={{
            width: 250,
            height: 250,
            alignSelf: "center",
            marginBottom: 18,
          }}
          source={{
            uri: "https://www.artnews.com/wp-content/uploads/2022/01/unnamed-2.png?w=631",
          }}
          resizeMode={"contain"}
        />

        <Text style={styles.headerTitle}>StonkX</Text>
        <Text style={styles.headerTitle}>NFT Marketplace</Text>
        {!loginMode && (
          <View>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Please input your email"
              onChangeText={setEmail}
              value={email}
            />
          </View>
        )}
        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please input your username"
          onChangeText={setUsername}
          value={username}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Please input your password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        {!loginMode && (
          <View>
            <Text style={styles.inputLabel}>Confirm Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Please input your username"
              onChangeText={setconpassword}
              value={conpassword}
              secureTextEntry={true}
            />
          </View>
        )}
        <View style={{ padding: 12 }}>
          <Button
            title={loginMode ? "Login" : "Register"}
            onPress={loginMode ? handleLogin : handleRegister} //navigation.navigate("HomePage")
          />
        </View>
        {!loginMode && (
          <Text
            style={{ marginTop: 6, textAlign: "center" }}
            onPress={() => setLoginMode(true)}
          >
            Click here to login
          </Text>
        )}
        {loginMode && (
          <Text
            style={{ marginTop: 6, textAlign: "center" }}
            onPress={() => setLoginMode(false)}
          >
            Click here to register
          </Text>
        )}
      </View>
    </View>
  );
}

export default Auth;

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
