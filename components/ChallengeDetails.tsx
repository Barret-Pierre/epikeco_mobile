import { useEffect, useState } from "react";
import { useUser } from "../hooks/userContext";
import { IParticipantChallenge } from "../interfaces/IChallenge";
import { Text, View } from "react-native";
import ReadChallenge from "./ReadChallenge";
import ActionsList from "./ActionsList";
import Leaderboard from "./Leaderboard";

const ChallengeDetails = ({
  challengeWithParticipant,
}: {
  challengeWithParticipant: IParticipantChallenge;
}) => {
  const { user } = useUser();
  const [userStatus, setUserStatus] = useState<null | "participant" | "owner">(
    null
  );
  const [userToChallengeId, setUserToChallengeId] = useState<string>("");

  useEffect(() => {
    for (const userToChallenge of challengeWithParticipant.userToChallenges) {
      const userId = userToChallenge.user.id;

      if (user && user.id && userId === user.id) {
        setUserStatus("participant");
        setUserToChallengeId(userToChallenge.id);

        if (challengeWithParticipant.createdBy.id === user.id) {
          setUserStatus("owner");
        }
      }
    }
  }, [user, userStatus, userToChallengeId]);

  return (
    <View>
      <ReadChallenge
        challengeWithParticipant={challengeWithParticipant}
        userToChallengeId={Number(userToChallengeId)}
        toggleUserStatus={setUserStatus}
        userStatus={userStatus}
      />
      <ActionsList
        challenge={challengeWithParticipant}
        userStatus={userStatus}
      />
      <Leaderboard />
    </View>
  );
};

export default ChallengeDetails;
