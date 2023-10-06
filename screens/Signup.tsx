import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { CREATE_USER } from "../graphql/createUsers";
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { primaryColor } from "../globals";

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
    <View style={styles.container}>
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
          raised
          titleStyle={{ marginHorizontal: 5 }}
          onPress={doSignup}
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
});
