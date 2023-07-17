import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { CREATE_USER } from "../graphql/createUsers";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doSignupMutation, { loading, error }] = useMutation(CREATE_USER);

  async function doSignup() {
    try {
      await doSignupMutation({
        variables: {
          data: {
            email: email,
            password: password,
          },
        },
      });
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <View>
      <Text>Signup</Text>
      {error && (
        <Text style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</Text>
      )}
      <Text>Email:</Text>
      <TextInput
        rejectResponderTermination={loading}
        textContentType="emailAddress"
        id="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Text>Password:</Text>
      <TextInput
        rejectResponderTermination={loading}
        textContentType="password"
        id="paswword"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={doSignup} title="S'inscrire"></Button>
    </View>
  );
}
