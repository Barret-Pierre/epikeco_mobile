import { Button, ScrollView, Text, View } from "react-native";
import { useUser } from "../hooks/userContext";
import ChallengesList from "../components/ChallengesList";
import { useEffect, useState } from "react";
import ChallengeDetails from "../components/ChallengeDetails";
import { useQuery } from "@apollo/client";
import { readOneChallenge } from "../graphql/readOneChallenge";
import { IParticipantChallenge } from "../interfaces/IChallenge";

export function Dashboard() {
  const { user } = useUser();
  const [challengeId, setChallengeId] = useState("");

  const { data, error } = useQuery<{
    readOneChallenge: IParticipantChallenge;
  }>(readOneChallenge, {
    variables: { challengeId },
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    console.log("Got data:", JSON.stringify(data, null, 4));
    console.log("Got error:", JSON.stringify(error, null, 4));
  }, [data, error]);

  useEffect(() => {
    console.log("challengeId", challengeId);
  }, [challengeId]);

  return (
    <ScrollView>
      <Text>
        Hello {user?.email} vous avez l'id {user?.id}
      </Text>
      <ChallengesList onSelect={setChallengeId} />

      {data && (
        <ChallengeDetails challengeWithParticipant={data.readOneChallenge} />
      )}
    </ScrollView>
  );
}
