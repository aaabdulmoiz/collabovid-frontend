import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import HomePage from "./screens/HomePage";
import AFHInput from "./screens/AFHInput";
import AFHMap from "./screens/AFHMap";
import MyComponent from "./screens/Bottom";
import HSMap from "./screens/HSMap";
import YourRequests from "./screens/YourRequests";
import YourCollabs from "./screens/YourCollabs";
import { UserProvider } from "./context/UserContext";

const Stack = createStackNavigator();

const LogReg = createStackNavigator();
const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const RequestStack = createStackNavigator();
const CollabStack = createStackNavigator();

const LogRegScreen = () => (
  <LogReg.Navigator headerMode="none">
    <LogReg.Screen name="Home" component={HomeScreen} />
    <LogReg.Screen name="Login" component={Login} />
    <LogReg.Screen name="Register" component={Register} />
  </LogReg.Navigator>
);

const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="HomePage" component={HomePage} />
    <HomeStack.Screen name="Ask for Help" component={AFHInput} />
    <HomeStack.Screen name="Ask Map" component={AFHMap} />
    <HomeStack.Screen name="Help Someone" component={HSMap} />
  </HomeStack.Navigator>
);

const RequestStackScreen = () => (
  <RequestStack.Navigator headerMode="none">
    <RequestStack.Screen name="Your Requests" component={YourRequests} />
  </RequestStack.Navigator>
);

const CollabStackScreen = () => (
  <CollabStack.Navigator headerMode="none">
    <CollabStack.Screen name="Your Collabs" component={YourCollabs} />
  </CollabStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="HomePage" component={HomeStackScreen} />
    <Tabs.Screen name="Your Requests" component={RequestStackScreen} />
    <Tabs.Screen name="Your Collabs" component={CollabStackScreen} />
  </Tabs.Navigator>
);

export default function Navigation() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={LogRegScreen} />
          <Stack.Screen name="HomePage" component={TabsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

// login, register and home stack (maybe add email verification step . also Allah help us )
//bottom tabs with stacks of {afhs, hs}, {your reqs and the pages with them}, {collabs} , {profile}

// {/* <NavigationContainer>
//         <Stack.Navigator initialRouteName="Home" headerMode="none">
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             initialParams={{ key: 2 }}
//           />
//           <Stack.Screen name="Login" component={Login} />
//           <Stack.Screen name="Register" component={Register} />
//           <Stack.Screen name="HomePage" component={HomePage} />
//           <Stack.Screen name="Ask for Help" component={AFHInput} />
//           <Stack.Screen name="Ask Map" component={AFHMap} />
//           <Stack.Screen name="Help Someone" component={HSMap} />
//           {/* <Stack.Screen name="Your Requests" component={YourRequests} /> */}
//         </Stack.Navigator>
//       </NavigationContainer> */}
