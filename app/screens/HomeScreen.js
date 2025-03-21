import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import UserData from "../components/UserData";
import axios from "axios";
import ListItemSeparator from "../components/ListItemSeparator";

const HomeScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://unikwork.com/instagram/api/get_data.php")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log("Error fetching the data", err));
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserData user={item} />}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
