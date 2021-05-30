import * as React from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../constants/Color";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";

function HomeScreen({ navigation, route }) {
  console.log("props are", route);
  console.log("hahah");
  return (
    <View style={stylesH.container}>
      <StatusBar backgroundColor={Color.text} barStyle="light-content" />
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <ImageBackground
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.5,
            justifyContent: "center",
          }}
        >
          <View style={{ marginTop: Dimensions.get("window").height * 0.6 }}>
            <TouchableOpacity
              style={[styles.button, { alignSelf: "center" }]}
              onPress={() => navigation.push("Login")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginTop: 10, alignSelf: "center" }]}
              onPress={() => navigation.push("Register")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;

const stylesH = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});

export default HomeScreen;
