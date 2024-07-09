import { initializeApp } from 'firebase/app';
import "firebase/firestore";
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Shop } from '../types/shop';


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


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getShops = async () => {
  const querySnapshot = await getDocs(collection(db, "shops"));
  const shops = querySnapshot.docs.map(doc => doc.data() as Shop);
  return shops
}