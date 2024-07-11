import { StyleSheet, FlatList, View, SafeAreaView } from 'react-native';
import { useEffect, useState } from 'react';
import { getShops } from './src/lib/firebase';
import { Shop } from './src/types/shop';
import { ShopReviewItem } from './src/components/shopReviewItem';


export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const shopItems = shops.map((shop, index) => (
    <ShopReviewItem shop={shop} key={index.toString()} />
  ));


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
