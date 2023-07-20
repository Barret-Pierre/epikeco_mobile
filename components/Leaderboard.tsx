import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { readChallengeLeaderboard } from "../graphql/readChallengeLeaderboard";
import { IUserToChallenge } from "../interfaces/IUserToChallenge";
import { Text, View } from "react-native";
import { IChallenge, IParticipantChallenge } from "../interfaces/IChallenge";
import { ListItem } from "@rneui/themed";

interface ChallengeLeaderboardData {
  readChallengeLeaderboard: IUserToChallenge[];
}

const Leaderboard = (props: { challengeId: string }) => {
  const { loading, error, data } = useQuery<ChallengeLeaderboardData>(
    readChallengeLeaderboard,
    {
      variables: { challengeId: props.challengeId },
    }
  );

  const userToChallenges: IUserToChallenge[] = useMemo(() => {
    if (data) {
      return data.readChallengeLeaderboard;
    } else {
      return [];
    }
  }, [data]);

  return (
    <View>
      {loading && <Text>Loading...</Text>}
      {data && (
        <View>
          <Text>Classement du challenge</Text>
          {userToChallenges.length !== 0 &&
            userToChallenges.map((userToChallenge, index) => (
              <ListItem key={userToChallenge.user?.id}>
                <Text>{index + 1}</Text>
                <ListItem.Content>
                  <ListItem.Title>{userToChallenge.user?.name}</ListItem.Title>
                </ListItem.Content>
                <Text>{userToChallenge.challengeScore}</Text>
              </ListItem>
            ))}
          {userToChallenges.length === 0 && (
            <Text>Aucun utilisateur dans le classement.</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default Leaderboard;
