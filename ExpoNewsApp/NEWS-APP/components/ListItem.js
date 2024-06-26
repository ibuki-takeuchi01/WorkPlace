import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View, Text } from 'react-native';

export const ListItem = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContainer}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{
            uri: 'https://picsum.photos/seed/picsum/200/300',
          }}
        />
      </View>
      <View style={styles.rightContainer}>
        <Text numberOfLines={3} style={styles.text}>
          Hirotsugu Kimura, a 24-year-old company employee,
          has become the youngest Japanese to complete a solo voyage around the world on a sailboat
          without making any port calls or receiving supplies.
        </Text>
        <Text style={styles.subText}>React News</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    marginVertical: 5,
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
