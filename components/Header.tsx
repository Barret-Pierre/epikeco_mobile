import { StyleSheet, Text, View } from "react-native";
import { useUser } from "../hooks/userContext";
import { Header as HeaderRNE, HeaderProps, Icon } from "@rneui/themed";

const Header = () => {
  const { user, logout } = useUser();
  return (
    <HeaderRNE
      centerComponent={{ text: "Epikeco", style: styles.heading }}
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
    />
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
  },
});

export default Header;
