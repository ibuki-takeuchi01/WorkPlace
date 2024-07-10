import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Shop } from "../types/shop";

type Props = {
  shop: Shop;
};

export const ShopReviewItem: React.FC<Props> = ({ shop }: Props) => {
  const { name, place, imageUrl, score } = shop;
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text>{name}</Text>
      <Text>{place}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: 100,
    height: 100,
  },
});