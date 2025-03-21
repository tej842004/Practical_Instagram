import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

import HomeScreen from "../screens/HomeScreen";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      Billabong: require("../assets/Billabong.otf"),
    }).then(() => setFontLoaded(true));
  }, []);

  if (!fontLoaded) return null;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          paddingBottom: 10,
          paddingTop: 5,
          height: 60,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "Instagram",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 22,
            fontFamily: "Billabong",
          },
          headerLeft: () => (
            <Ionicons
              style={styles.headerLeftIcon}
              name="camera-outline"
              size={25}
            />
          ),
          headerRight: () => (
            <Ionicons
              style={styles.headerRightIcon}
              name="qr-code-outline"
              size={25}
            />
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeftIcon: {
    marginLeft: 15,
  },
  headerRightIcon: {
    marginRight: 15,
  },
  headerTitle: {
    position: "absolute",
    alignSelf: "center",
  },
});

export default AuthNavigator;
