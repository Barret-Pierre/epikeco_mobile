import { useQuery } from "@apollo/client";
import { Button, Text, View } from "react-native";
import { READ_POSTS } from "../graphql/readPosts";
import { useUser } from "../hooks/userContext";
import { IPost } from "../interfaces";
import ChallengesList from "../components/ChallengesList";
import { useState } from "react";

export function Dashboard() {
  const { user, logout } = useUser();
  const [challengeId, setChallengeId] = useState("");

  return (
    <View>
      <Text>Dashboard</Text>
      <Text>
        Hello {user?.email} vous avez l'id {user?.id}
      </Text>
      <Button onPress={logout} title="Singout"></Button>
      <ChallengesList onUpdate={() => console.log()} />
      {challengeId && <Text>{challengeId}</Text>}
    </View>
  );
}
