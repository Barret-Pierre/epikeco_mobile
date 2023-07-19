import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { readChallengeLeaderboard } from "../graphql/readChallengeLeaderboard";
import { IUserToChallenge } from "../interfaces/IUserToChallenge";
import { Text, View } from "react-native";
import { ListItem } from "@rneui/base";
import { IParticipantChallenge } from "../interfaces/IChallenge";

interface ChallengeLeaderboardData {
  readChallengeLeaderboard: IUserToChallenge[];
}

const Leaderboard = (props: {
  challengeWithParticipant: IParticipantChallenge;
}) => {
  const challengeId = props.challengeWithParticipant.id;
  const { loading, error, data } = useQuery<ChallengeLeaderboardData>(
    readChallengeLeaderboard,
    {
      variables: { challengeId },
    }
  );

  const userToChallenges: IUserToChallenge[] = useMemo(() => {
    if (data) {
      return data.readChallengeLeaderboard;
    } else {
      return [];
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // userToChallenges.sort((a, b) => b.challengeScore - a.challengeScore);

  return (
    <View>
      <Text>Classement du challenge</Text>
      {userToChallenges.length !== 0 &&
        userToChallenges.map((userToChallenge, index) => (
          <ListItem key={userToChallenge.user?.id}>
            <td>{index + 1}</td>
            <ListItem.Content>
              <ListItem.Title>
                {userToChallenge.user?.name} ({userToChallenge.challengeScore})
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}{" "}
      {userToChallenges.length === 0 && (
        <Text>Aucun utilisateur dans le classement.</Text>
      )}
    </View>
  );
};

export default Leaderboard;
