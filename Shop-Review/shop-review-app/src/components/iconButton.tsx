import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  name: string;
  color?: string;
};

export const IconButton: React.FC<Props> = ({
  onPress,
  color = "#000",
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name="x" color={color} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});