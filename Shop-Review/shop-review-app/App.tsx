import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import "firebase/firestore";
import { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};


type Shop = {
  name: string;
  place: string;
}

export default function App() {

  const [shops, setShops] = useState<Shop[]>([]);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const querySnapshot = await getDocs(collection(db, "shops"));
    const shops = querySnapshot.docs.map(doc => doc.data() as Shop);
    setShops(shops);
  }

  const shopItems = shops.map((shop, index) => {
    return (
      <View style={{ margin: 10 }} key={index.toString()}>
        <Text>{shop.name}</Text>
        <Text>{shop.place}</Text>
      </View>
    )
  });

  return (
    <View style={styles.container}>{shopItems}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
