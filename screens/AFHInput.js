import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Color from "../constants/Color";
import styles from "../constants/styles";
import StatusBar from "../components/StatusBar";
import {
  Switch,
  Menu,
  Divider,
  Provider,
  Button as ButtonM,
} from "react-native-paper";
import { UserContext } from "../context/UserContext";

function AFHInput({ navigation, route }) {
  const [isSwitch, setIsSwitch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState("Category");
  const [description, setDescription] = useState("");
  const { usercon, setUsercon } = useContext(UserContext);

  useEffect(() => {
    //console.log(route.params);
  }, []);

  const navigateToMap = async () => {
    const payment = isSwitch ? "Yes" : "No";
    const userInfo = {
      ...usercon,
      payment: payment,
      category: category,
      description: description,
    };
    //console.log(userInfo);
    await setUsercon(userInfo);
    navigation.navigate("Ask Map");
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={[stylesH.container, { backgroundColor: Color.background }]}>
      <StatusBar backgroundColor={Color.primary} />
      <View>
        <ImageBackground
          style={stylesH.card_view}
          source={require("../assets/images/shake.png")}
        ></ImageBackground>
        <View
          style={{
            marginTop: height * 0.02,
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <TextInput
            style={stylesH.input}
            placeholder="Explain what kind of help do you want"
            multiline={true}
            numberOfLines={10}
            onChangeText={(description) => setDescription(description)}
          ></TextInput>
        </View>
        <View
          style={{
            marginTop: height * 0.02,
            flexDirection: "row",
          }}
        >
          <Text style={{ marginLeft: width * 0.05 }}>
            Are you willing to pay?
          </Text>

          <Switch
            style={{ right: 1 }}
            color={Color.primary}
            value={isSwitch}
            onValueChange={() => setIsSwitch(!isSwitch)}
          />
        </View>
        <View
          style={{
            marginTop: height * 0.02,
            flexDirection: "row",
            marginLeft: width * 0.05,
          }}
        >
          <Text style={{ marginTop: height * 0.01 }}>
            Assign a category to your Problem
          </Text>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<ButtonM onPress={openMenu}>{category}</ButtonM>}
          >
            <Menu.Item
              onPress={() => {
                setCategory("Tech");
                closeMenu();
              }}
              title="Tech"
            />
            <Menu.Item
              onPress={() => {
                setCategory("Home Related");
                closeMenu();
              }}
              title="Home Related"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setCategory("Other");
                closeMenu();
              }}
              title="Other"
            />
          </Menu>
        </View>

        <View
          style={{
            marginTop: height * 0.02,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.button} onPress={navigateToMap}>
            <Text style={styles.buttonText}>Select Location</Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
            bottom: 0,
            borderBottomWidth: 1,
            borderColor: Color.primary,
          }}
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
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
    height: height * 0.15,
    borderColor: "#e6e3e3",
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: Color.white,
    textAlignVertical: "top",
  },
  card1_view: {
    borderRadius: 10,
    height: height * 0.24,
    width: "95%",
    marginTop: 10,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Color.primary,
  },
  card_view: {
    height: height * 0.27,
    width: "100%",
    alignSelf: "center",
    backgroundColor: Color.primary,
  },
});

export default AFHInput;
