import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createContext, useContext, useEffect, useState } from "react";
import { ME } from "../graphql/me";
import { IUser } from "../interfaces";

export const UserContext = createContext<{
  user: null | undefined | IUser;
  logout: () => void;
  login: (token: string) => void;
}>({
  user: undefined,
  logout: () => {},
  login: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null | undefined>(undefined);
  const [token, setToken] = useState<String>("");

  const { data, error } = useQuery(ME, {
    fetchPolicy: "network-only",
    variables: { token: token },
  });
  // the variable "token" is not usefull in this query but it allows to refetch this query each time token value changes (without useEffect or method refetch in {data, errors, refetch}).

  const { reset } = useNavigation();

  useEffect(() => {
    if (data?.me) {
      setUser(data.me);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setUser(null);
    }
  }, [error]);

  useEffect(() => {
    if (user === null) {
      reset({
        index: 0,
        routes: [{ name: "Signin" } as never],
      });
    } else if (user) {
      reset({
        index: 0,
        routes: [{ name: "Dashboard" } as never],
      });
    }
  }, [user]);

  async function onTokenChange(token?: string) {
    if (token) {
      await AsyncStorage.setItem("token", token);
      setToken(token);
      // it reloads query ME because the value of token change (and it's an variable not usefull)
    } else {
      await AsyncStorage.removeItem("token");
      setToken("");
    }
    setUser(undefined);
  }

  return (
    <UserContext.Provider
      value={{
        user: user,
        logout: () => onTokenChange(),
        login: (token) => onTokenChange(token),
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
