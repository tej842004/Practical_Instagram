import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";

const Header = ({ user }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerUserInfo}>
        <Image
          resizeMode="contain"
          source={{ uri: user?.user.profile }}
          style={styles.headerIcon}
        />
        <Text>{user?.user.name}</Text>
      </View>
      <Ionicons name="ellipsis-horizontal" size={25} />
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
    marginRight: 10,
    borderColor: colors.background,
  },
  headerUserInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Header;
