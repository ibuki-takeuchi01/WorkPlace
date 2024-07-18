import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Form } from "../components/Form";
import { Button } from "../components/Button";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<any> = ({ navigation, route }: Props) => {
  const [name, setName] = useState<string>("");
  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => { setName(text) }}
        label="名前"
      />
      <Button onPress={() => { }} text="保存する" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})