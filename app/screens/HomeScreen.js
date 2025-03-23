import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import UserData from "../components/UserData";
import ListItemSeparator from "../components/ListItemSeparator";
import useData from "../hooks/useData";
import colors from "../config/colors";

const HomeScreen = () => {
  const { data: users, error, isLoading } = useData();

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserData user={item} />}
          ItemSeparatorComponent={ListItemSeparator}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: colors.primary,
  },
});

export default HomeScreen;
