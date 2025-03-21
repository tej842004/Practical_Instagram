import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./app/navigations/AuthNavigator";
import navigationTheme from "./app/navigations/navigationTheme";
import { useVideoPlayer, VideoView } from "expo-video";
import { Dimensions } from "react-native";

const localSource =
  "https://unikwork.com//instagram//videos//201912211438_10001_mine.mp4";

export default function App() {
  const player = useVideoPlayer(localSource, (player) => {
    player.loop = true;
    player.play;
  });

  return (
    <NavigationContainer theme={navigationTheme}>
      <AuthNavigator />
    </NavigationContainer>
  );
}
