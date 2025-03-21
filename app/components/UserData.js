import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Button,
  FlatList,
  TextInput,
  Dimensions,
} from "react-native";
import configColors from "../config/colors";
import Header from "./Header";
import Comments from "./Comments";
import ListItemSeparator from "./ListItemSeparator";

const { width } = Dimensions.get("window");

const UserData = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const renderMedia = ({ item }) => {
    return <Image source={{ uri: item }} style={styles.media} />;
  };

  return (
    <>
      <Header user={user} />
      <View style={styles.container}>
        <FlatList
          data={user?.images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(index) => index.toString()}
          renderItem={renderMedia}
        />
        <View style={styles.iconsContainer}>
          <View style={styles.icons}>
            <MaterialCommunityIcons
              name="heart"
              size={25}
              color={configColors.danger}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <MaterialCommunityIcons name="comment-outline" size={25} />
            </TouchableOpacity>
            <MaterialCommunityIcons name="share-variant" size={25} />
          </View>
          <MaterialCommunityIcons
            style={{ marginRight: 15 }}
            name="bookmark-outline"
            size={25}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.likes}>{user?.likes} Likes</Text>
          <View style={styles.description}>
            <Text style={styles.username}>{user?.user.name}</Text>
            <Text style={styles.caption}>
              {user?.descriptions} {user?.hashtags}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.comment}>
              View all {user?.comments.length} comments
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentContainer}>
          <Image
            resizeMode="contain"
            source={{ uri: user?.user.profile }}
            style={styles.icon}
          />
          <TextInput placeholder="Add a comment" />
        </View>
      </View>

      <Modal visible={modalVisible}>
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={user?.comments}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Comments comment={item} />}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </Modal>
    </>
  );
};

// const styles = StyleSheet.create({
//   container: {},
//   image: {
//     height: 350,
//     width: "100%",
//     marginBottom: 10,
//   },
//   icons: {
//     flex: 1,
//     flexDirection: "row",
//     gap: 10,
//     marginLeft: 15,
//   },
//   iconsContainer: {
//     flexDirection: "row",
//   },
//   description: {
//     flexDirection: "row",
//   },
//   username: {
//     fontWeight: "bold",
//     marginRight: 10,
//     marginLeft: 15,
//   },
//   likes: {
//     marginLeft: 15,
//   },
//   comment: {
//     marginLeft: 15,
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   commentContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginLeft: 15,
//     marginBottom: 15,
//   },
//   detailsContainer: {
//     marginVertical: 15,
//   },
//   caption: {
//     width: 300,
//   },
// });

const styles = StyleSheet.create({
  media: {
    width: width,
    height: 350,
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginLeft: 15,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  description: {
    flexDirection: "row",
  },
  username: {
    fontWeight: "bold",
    marginRight: 10,
    marginLeft: 15,
  },
  likes: {
    marginLeft: 15,
  },
  comment: {
    marginLeft: 15,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 15,
  },
  detailsContainer: {
    marginVertical: 15,
  },
  caption: {
    width: 300,
  },
});

export default UserData;
