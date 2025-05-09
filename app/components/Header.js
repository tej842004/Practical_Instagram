import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const Header = ({ user }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerUserInfo}>
        <View
          style={{
            height: 60,
            width: 60,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "rgba(255, 35, 122, 1)",
            borderRadius: 30,
            marginRight: 10,
          }}
        >
          <Image
            resizeMode="contain"
            source={{ uri: user?.user.profile }}
            style={styles.headerIcon}
          />
        </View>
        <Text>{user?.user.name}</Text>
      </View>
      <Ionicons name="ellipsis-vertical" size={25} />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  headerIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: colors.background,
  },
  headerUserInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
