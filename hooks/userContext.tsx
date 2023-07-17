import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
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

  const { data, error, refetch } = useQuery(ME, {
    fetchPolicy: "network-only",
  });

  const { navigate, reset } = useNavigation();

  useEffect(() => {
    if (data) {
      if (data.me) {
        setUser(data.me);
      }
    }
  }, [data]);

  useEffect(() => {
    if (user === null) {
      navigate("Signin" as never);
    } else if (user) {
      reset({
        index: 0,
        routes: [{ name: "Dashboard" } as never],
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      setUser(null);
    }
  }, [error]);

  async function onTokenChange(token?: string) {
    if (token) {
      await AsyncStorage.setItem("token", token);
    } else {
      await AsyncStorage.removeItem("token");
    }
    setUser(undefined);
    refetch();
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
