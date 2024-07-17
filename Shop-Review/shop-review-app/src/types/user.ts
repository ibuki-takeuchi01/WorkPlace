import { Timestamp } from "firebase/firestore";

export type User = {
  id?: string;
  name: string;
  updateAt: Timestamp;
  createAt: Timestamp;
}

export const initialUser: User = {
  name: "",
  updateAt: Timestamp.now(),
  createAt: Timestamp.now(),
}