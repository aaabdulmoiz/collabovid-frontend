import React, { useEffect, useState, useContext } from "react";
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
import RegularLoading from "../components/RegularLoading";
import { baseUrl, url } from "../constants/BaseUrl";
import { UserContext } from "../context/UserContext";

function Login({ navigation, route }) {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { usercon, setUsercon } = useContext(UserContext);

  useEffect(() => {}, []);

  const loginUser = async () => {
    if (loginInfo.email === "") {
      alert("Please fill the fields.");
      return;
    }

    loginServer();
    // if (await loginServer()) {
    //   //   alert("User Logged In");
    //   console.log("haha");
    //   //await navigation.push("HomePage", { user });
    //   setLoading(false);
    // } else {
    //   //alert("Could not login");
    //   setLoading(false);
    // }
  };

  const loginServer = async () => {
    setLoading(true);
    const api = await `${url}api/users/login`;
    try {
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const res = await response.json();
      //console.log(res);
      if ((await response.status) === 200) {
        await setUsercon(res);
        await navigation.push("HomePage", {
          screen: "HomePage",
          params: { screen: "HomePage", params: res },
        });
        setLoading(false);
      } else {
        alert(res.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      alert("Could not login. Please try again.");
      setLoading(false);
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
              Sign in
            </Text>
            <View style={{ marginTop: height * 0.1, alignItems: "center" }}>
              <TextInput
                style={stylesH.input}
                placeholder="Email / Mobile Number"
                returnKeyType="next"
                autoCapitalize="none"
                onChangeText={(email) =>
                  setLoginInfo({ ...loginInfo, email: email })
                }
              />
              <TextInput
                style={[stylesH.input, { marginTop: height * 0.05 }]}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) =>
                  setLoginInfo({ ...loginInfo, password: password })
                }
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  { marginTop: height * 0.05, alignSelf: "center" },
                ]}
                onPress={loginUser}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginTop: height * 0.02 }}>
                <Text style={{ color: Color.primary, fontSize: 15 }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  } else {
    return <RegularLoading />;
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

export default Login;

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
