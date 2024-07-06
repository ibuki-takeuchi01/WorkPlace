import { StyleSheet, SafeAreaView, Text } from "react-native";
import { WebView } from 'react-native-webview';
import { useDispatch, useSelector } from "react-redux";
import { ClipButton } from "../components/ClipButton";
import { addClip, deleteClip } from "../store/userSlice"

export const ArticleScreen = ({ route }) => {
  const { article } = route.params;
  const dispatch = useDispatch();
  const clips = useSelector((state) => state.user.clips)
  const isClipped = clips.some((clip) => clip.url === article.url)
  const onPress = () => {
    if (isClipped) {
      dispatch(deleteClip(article))
    } else {
      dispatch(addClip(article))
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <ClipButton onPress={onPress} enabled={isClipped} />
      <WebView source={{ uri: article.url }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});