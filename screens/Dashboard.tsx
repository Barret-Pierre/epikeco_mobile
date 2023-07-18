import { Button, Text, View } from "react-native";
import { useUser } from "../hooks/userContext";
import ChallengesList from "../components/ChallengesList";
import { useEffect, useState } from "react";
import ChallengeDetails from "../components/ChallengeDetails";
import { useQuery } from "@apollo/client";
import { readOneChallenge } from "../graphql/readOneChallenge";
import { IChallenge } from "../interfaces/IChallenge";

export function Dashboard() {
  const { user, logout } = useUser();
  const [challengeId, setChallengeId] = useState("");
  const [challenge, setChallenge] = useState(undefined);

  const { data, refetch, error } = useQuery<{ readOneChallenge: IChallenge }>(
    readOneChallenge,
    {
      variables: { challengeId },
      fetchPolicy: "cache-and-network",
    }
  );

  useEffect(() => {
    console.log("Got data:", data);
    console.log("Got error:", JSON.stringify(error, null, 4));

    // if (data) {
    //   if (data.readOneChallenge) {
    //     setChallenge(data.readOneChallenge);
    //   } else {
    //     setChallenge(undefined);
    //   }
    // }
  }, [data, error]);

  useEffect(() => {
    console.log("challengeId", challengeId);
  }, [challengeId]);

  return (
    <View>
      <Button onPress={logout} title="Singout"></Button>
      <Text>Dashboard</Text>
      <Text>
        Hello {user?.email} vous avez l'id {user?.id}
      </Text>
      <ChallengesList onSelect={setChallengeId} onRefetchChallenge={() => {}} />
      {challengeId && <Text>{challengeId}</Text>}

      {challenge && <ChallengeDetails challenge={challenge} />}
    </View>
  );
}
