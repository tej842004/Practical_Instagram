import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
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
  BackHandler,
  Share,
} from "react-native";
import configColors from "../config/colors";
import Header from "./Header";
import Comments from "./Comments";
import ListItemSeparator from "./ListItemSeparator";
import { useVideoPlayer, VideoView } from "expo-video";
import numeral from "numeral";
import colors from "../config/colors";

const { width } = Dimensions.get("window");

const UserData = ({ user }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const mediaData = [...(user?.images || []), ...(user?.videos || [])];

  const videoPlayers = mediaData
    .filter((item) => item.endsWith(".mp4"))
    .reduce((acc, videoUri) => {
      acc[videoUri] = useVideoPlayer(videoUri);
      return acc;
    }, {});

  const renderMedia = ({ item }) => {
    if (item.endsWith(".mp4")) {
      return <VideoView player={videoPlayers[item]} style={styles.media} />;
    } else {
      return <Image source={{ uri: item }} style={styles.media} />;
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {
        setModalVisible(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [modalVisible]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this awesome content!",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          Alert.alert("Shared via", result.activityType);
        } else {
          Alert.alert("Content Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        Alert.alert("Share Cancelled");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <>
      <Header user={user} />
      <View style={styles.container}>
        <View style={styles.mediaContainer}>
          <FlatList
            data={mediaData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(index) => index.toString()}
            renderItem={renderMedia}
          />
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.icons}>
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={25}
                color={isLiked ? configColors.primary : configColors.dark}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons
                name="chatbubble-outline"
                size={25}
                color={configColors.dark}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onShare()}>
              <Ionicons
                name="paper-plane-outline"
                size={25}
                color={configColors.dark}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsBookmarked(!isBookmarked)}>
            <Ionicons
              style={{ marginRight: 15 }}
              name={isBookmarked ? "bookmark" : "bookmark-outline"}
              size={25}
              color={isBookmarked && configColors.medium}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.likes}>
            {numeral(user?.likes || 0)
              .format("0.[0]a")
              .toUpperCase()}{" "}
            Likes
          </Text>
          <Text style={styles.description}>
            <Text style={{ fontWeight: "bold" }}>
              {user?.user?.name || "Unknown"}
            </Text>{" "}
            {user?.descriptions || ""}{" "}
            <Text style={{ color: "rgba(217, 26, 70, 1)" }}>
              {user?.hashtags || ""}
            </Text>
          </Text>
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
          <TextInput placeholder="Add a comment..." />
        </View>
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <Button
          title="Close"
          onPress={() => setModalVisible(false)}
          color={colors.primary}
        />
        <FlatList
          data={user?.comments || []}
          keyExtractor={(index) => index.toString()}
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
  mediaContainer: {
    marginBottom: 15,
  },
});

export default UserData;
