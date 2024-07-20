import { initializeApp } from 'firebase/app';
import "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { collection, getDocs, getFirestore, orderBy, query, doc, getDoc, setDoc } from 'firebase/firestore';
import { Shop } from '../types/shop';
import { initialUser, User } from '../types/user';

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
};

export const signin = async () => {
  const auth = getAuth();
  const userCredintial = signInAnonymously(auth);
  const { uid } = (await userCredintial).user
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists) {
    await setDoc(docRef, initialUser);
    return {
      ...initialUser,
      id: uid
    } as User
  } else {
    return {
      id: uid,
      ...docSnap.data()
    } as User
  }
}

export const updateUser = async (userId: string | undefined, params: any => {
  if (userId == undefined) return;
  const db = getFirestore();
  const docRef = doc(db, "users", userId);
  await setDoc(docRef, params);
}