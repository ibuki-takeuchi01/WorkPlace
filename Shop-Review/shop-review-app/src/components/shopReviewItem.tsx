import React from "react";
import { View, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from "react-native";
import { Shop } from "../types/shop";
import { Stars } from "../components/Stars";

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;
const PADDING = 16;
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING;
type Props = {
  shop: Shop;
  onPress: () => void;
};

export const ShopReviewItem: React.FC<Props> = ({ shop, onPress }: Props) => {
  const { name, place, imageUrl, score } = shop;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.placeText}>{place}</Text>
      <View style={styles.star}>
        <Stars score={score} starSize={16} textSize={12} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: PADDING
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontWeight: "bold"
  },
  placeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
  star: {
    marginTop: 4,
  },
});