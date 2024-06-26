import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text } from 'react-native';
import { ListItem } from "./components/ListItem"

export default function App() {
  return (
    <View style={styles.container}>
      <ListItem
        imageUrl={"https://picsum.photos/seed/picsum/200/700"}
        title={"Hirotsugu Kimura, a 24-year-old company employee, has become the youngest Japanese to complete a solo voyage around the world on a sailboat without making any port calls or receiving supplies."}
        author={"React Native"}
      />
      <ListItem
        imageUrl={"https://picsum.photos/seed/picsum/500/300"}
        title={"I`m very happy to be able to come back after successfully sailing around the world,” Kimura said with a smile at a ceremony held to celebrate his safe return."}
        author={"React Native"}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
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
