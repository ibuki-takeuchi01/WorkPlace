import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { ShopDetail } from "./ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">;
  route: RouteProp<RootStackParamList, "Shop">
}

export const ShopScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { shop } = route.params;
  useEffect(() => {
    navigation.setOptions({ title: shop.name })
  }, [shop])

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop} />
      <FloatingActionButton
        onPress={() => navigation.navigate("CreateReview", { shop })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start"
  },
});