import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Comments = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text>{comment}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    padding: 15,
  },
});

export default Comments;
