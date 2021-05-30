import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Color from "../constants/Color";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";
import { baseUrl, url } from "../constants/BaseUrl";

function Register({ navigation, route }) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    cell: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    console.log(userInfo);
    //verifyFields() if returns true we move to fetch api
    if (userInfo.name === "") {
      alert("Invalid Data. Please fill the fields.");
      return;
    }
    // fetchApi function
    if (await registerServer()) {
      alert("Account Registered. Please Login.");
      navigation.replace("Login");
    } else {
      alert("Could not register!");
      setLoading(false);
    }
  };

  const registerServer = async () => {
    setLoading(true);
    const api = await `${url}api/users`;
    //console.log(api);
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      if ((await response.status) === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  if (!loading) {
    return (
      <View style={stylesH.container}>
        <StatusBar backgroundColor={Color.primary} />
        <View>
          <View style={{ marginTop: height * 0.1 }}>
            <Text style={{ fontSize: 26, marginLeft: width * 0.05 }}>
              Sign up
            </Text>
            <View style={{ marginTop: height * 0.1, alignItems: "center" }}>
              <TextInput
                style={stylesH.input}
                placeholder="Name"
                returnKeyType="next"
                autoCapitalize="none"
                value={userInfo.name}
                onChangeText={(name) =>
                  setUserInfo({ ...userInfo, name: name })
                }
              />
              <TextInput
                style={[stylesH.input, { marginTop: height * 0.02 }]}
                placeholder="Email"
                returnKeyType="next"
                autoCapitalize="none"
                value={userInfo.email}
                onChangeText={(email) =>
                  setUserInfo({ ...userInfo, email: email })
                }
              />
              <TextInput
                style={[stylesH.input, { marginTop: height * 0.02 }]}
                placeholder="Mobile Number"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={(cell) =>
                  setUserInfo({ ...userInfo, cell: cell })
                }
              />
              <TextInput
                style={[stylesH.input, { marginTop: height * 0.02 }]}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) =>
                  setUserInfo({ ...userInfo, password: password })
                }
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { marginTop: height * 0.05, alignSelf: "center" },
                ]}
                onPress={registerUser}
              >
                <Text style={styles.buttonText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View
        style={[
          stylesH.container,
          {
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          },
        ]}
      >
        <ActivityIndicator
          color={Color.primary}
          size="large"
        ></ActivityIndicator>
      </View>
    );
  }
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const stylesH = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  input: {
    width: width * 0.9,
    height: height * 0.075,
    borderColor: "#e6e3e3",
    padding: 10,
    borderBottomWidth: 1,
  },
});

export default Register;

//Local api s3rver check
// const checkServer = async () => {
//     try {
//       //   const response = await fetch("http://84ae9b96f8aa.ngrok.io/");
//       console.log(url);
//       const response = await fetch("http://192.168.10.4:5000/");
//       console.log(await response.json());
//     } catch (error) {
//       console.log(error);
//     }
//   };
