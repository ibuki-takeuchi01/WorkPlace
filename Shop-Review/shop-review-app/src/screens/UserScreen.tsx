import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { UserContext } from "../contexts/userContext";
import { updateUser } from "../lib/firebase";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<any> = ({ navigation, route }: Props) => {
  const { user } = useContext(UserContext);
  const [name, setName] = useState<string>("");


  const onSubmit = async () => {
    if (user == null) return;
    await updateUser(user.id, name);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => { setName(text) }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})