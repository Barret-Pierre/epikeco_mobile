import { Image, StyleSheet, Text, View } from "react-native";
import { useUser } from "../hooks/userContext";
import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";

const Logo = () => {
  return (
    <Image
      source={require("../assets/logo.png")}
      style={{ width: 300, height: 42 }}
    />
  );
};

const Header = () => {
  const { user, logout } = useUser();
  return (
    <HeaderRNE
      leftComponent={<Logo />}
      rightComponent={
        <View>
          {user && (
            <Icon
              name="exit-to-app"
              type="material-community"
              onPress={logout}
            />
          )}
        </View>
      }
      backgroundColor="#ffffff"
    />
  );
};

export default Header;
