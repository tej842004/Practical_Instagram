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
import { useVideoPlayer, VideoView } from "expo-video";

const { width } = Dimensions.get("window");

const UserData = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const mediaData = [...(user?.images || []), ...(user?.videos || [])];

  const videoPlayers = mediaData
    .filter((item) => item.endsWith(".mp4"))
    .reduce((acc, videoUri) => {
      acc[videoUri] = useVideoPlayer(videoUri, (player) => {
        player.loop = true;
        player.play();
      });
      return acc;
    }, {});

  const renderMedia = ({ item }) => {
    if (item.endsWith(".mp4")) {
      return <VideoView player={videoPlayers[item]} style={styles.media} />;
    } else {
      return <Image source={{ uri: item }} style={styles.media} />;
    }
  };

  return (
    <>
      <Header user={user} />
      <View style={styles.container}>
        <FlatList
          data={mediaData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
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
          <Text style={styles.likes}>{user?.likes || 0} Likes</Text>
          <View style={styles.description}>
            <Text style={styles.username}>{user?.user?.name || "Unknown"}</Text>
            <Text style={styles.caption}>
              {user?.descriptions || ""} {user?.hashtags || ""}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.comment}>
              View all {user?.comments?.length || 0} comments
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.commentContainer}>
          {user?.user?.profile && (
            <Image
              resizeMode="contain"
              source={{ uri: user?.user?.profile }}
              style={styles.icon}
            />
          )}
          <TextInput placeholder="Add a comment" />
        </View>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={user?.comments || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Comments comment={item} />}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </Modal>
    </>
  );
};

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
