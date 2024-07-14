import { initializeApp } from 'firebase/app';
import "firebase/firestore";
import { collection, getDocs, getFirestore, orderBy, query, runTransaction } from 'firebase/firestore';
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
  try {
    const q = query(collection(db, "shops"), orderBy("score", "desc"));
    const querySnapshot = await getDocs(q);
    const shops = querySnapshot.docs.map(doc => doc.data() as Shop);
    return shops
  } catch (err) {
    console.log(err);
    return [];
  }

}