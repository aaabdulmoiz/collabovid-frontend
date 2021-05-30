import Color from "../constants/Color";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  image: {
    backgroundColor: "black",
  },
  button: {
    backgroundColor: Color.primary,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.06,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  goButton: {
    backgroundColor: Color.primary,
    width: Dimensions.get("window").height * 0.13,
    height: Dimensions.get("window").height * 0.13,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 5,
  },
  goAround: {
    borderWidth: 4,
    borderColor: Color.primary,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
  },
});

export default styles;
