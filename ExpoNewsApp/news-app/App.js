import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <Image 
            style={{width: 100, height: 100}}
            source={{uli: "https://picsum.photos/id/10/300/300"}}>
          </Image>
        </View>
        <View style={styles.rightContainer}></View>
      </View>
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
    backgroundColor: "red",
    flexDirection: "row"
  },
  leftContainer: {
    width: 100,
    backgroundColor: "green"
  },
  rightContainer: {
    flex: 1,
    backgroundColor: "blue"
  }
});
