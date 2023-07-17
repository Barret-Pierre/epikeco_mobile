import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { SIGNIN } from "../graphql/singin";
import { useUser } from "../hooks/userContext";
import { Signup } from "./Signup";

export function Signin() {
  const { login } = useUser();
  const [email, setEmail] = useState("admin@keops.fr");
  const [password, setPassword] = useState("superSecret");
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const { navigate } = useNavigation();

  const [doSigninMutation, { loading, error }] = useMutation(SIGNIN);

  async function doSingin() {
    try {
      const { data } = await doSigninMutation({
        variables: {
          email: email,
          password: password,
        },
      });
      if (data.signin) {
        console.log("Got data:", data.signin);
        login(data.signin);
      } else {
        setWrongCredentials(true);
      }
    } catch {}
  }

  return (
    <View>
      <Text>Signin</Text>
      {wrongCredentials === true && <p>Identifiants incorrectes</p>}
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
      <Button onPress={doSingin} title="Se Connecter"></Button>
      <Button
        onPress={() => navigate("Signup" as never)}
        title="S'inscrire"
      ></Button>
    </View>
  );
}
