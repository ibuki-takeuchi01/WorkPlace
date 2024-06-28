import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, SafeAreaView, Text, ScrollView } from 'react-native';
import { ListItem } from "./components/ListItem"
import articles from "./components/dummies/articles.json"

export default function App() {
  const items = articles.map((article, index) => {
    return (
      <ListItem imageUrl={article.urlToImage} title={article.title} author={article.author} key={index.toString()} />
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{items}</ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  itemContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row"
  },
  leftContainer: {
    width: 100,
  },
  rightContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between"
  },
  text: {
    fontSize: 16,
  },
  subText: {
    fontSize: 12,
    color: "gray",
  }
});
