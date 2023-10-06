import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { SIGNIN } from "../graphql/singin";
import { useUser } from "../hooks/userContext";
import * as React from "react";
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "@rneui/themed";
import { primaryColor } from "../globals";

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
    } catch (error) {
      console.log("ERROR:", JSON.stringify(error, null, 4));
    }
  }

  return (
    <View style={styles.container}>
      {wrongCredentials === true && <p>Email et/ou mot de passe incorrects</p>}
      {error && (
        <Text style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</Text>
      )}

      <View style={styles.wrapperInputs}>
        <Input
          leftIcon={<Icon name="account-outline" size={20} />}
          placeholder="Email"
          rejectResponderTermination={loading}
          textContentType="emailAddress"
          id="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          leftIcon={<Icon name="lock-outline" size={20} />}
          placeholder="Mot de passe"
          rejectResponderTermination={loading}
          textContentType="password"
          secureTextEntry={true}
          id="paswword"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.wrapperButtons}>
        <Button
          buttonStyle={{ backgroundColor: primaryColor }}
          containerStyle={{ margin: 5 }}
          disabledStyle={{
            borderWidth: 2,
            borderColor: "#00F",
          }}
          disabledTitleStyle={{ color: "#00F" }}
          icon={<Icon name="arrow-right" size={15} color="#FFF" />}
          loadingProps={{ animating: true }}
          onPress={doSingin}
          raised
          title="Je me connecte !"
          titleStyle={{ marginHorizontal: 5 }}
          style={styles.button}
        />
        <Text>... ou je n'ai pas encore de compte Epik'Eco</Text>
        <Button
          buttonStyle={{
            borderColor: primaryColor,
            marginTop: 10,
          }}
          titleStyle={{ color: primaryColor }}
          type="outline"
          onPress={() => navigate("Signup" as never)}
          title="S'inscrire"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapperInputs: {
    flex: 1,
    justifyContent: "center",
  },
  wrapperButtons: {
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    marginBottom: 10,
  },
});
