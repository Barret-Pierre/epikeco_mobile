import { useEffect, useState } from "react";
import { useUser } from "../hooks/userContext";
import { IParticipantChallenge } from "../interfaces/IChallenge";
import ReadChallenge from "./ReadChallenge";
import ActionsList from "./ActionsList";
import Leaderboard from "./Leaderboard";
import { Tab } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (challengeWithParticipant) {
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
    }
  }, [user, userStatus, userToChallengeId]);

  return (
    <View>
      {index === 0 ? (
        <ReadChallenge
          challengeWithParticipant={challengeWithParticipant}
          userToChallengeId={Number(userToChallengeId)}
          toggleUserStatus={setUserStatus}
          userStatus={userStatus}
        />
      ) : index === 1 ? (
        <ActionsList
          challenge={challengeWithParticipant}
          userStatus={userStatus}
        />
      ) : (
        <Leaderboard challengeId={challengeWithParticipant.id} />
      )}

      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: "white",
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Infos"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "information-circle", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Taches"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "leaf", type: "ionicon", color: "white" }}
        />
        <Tab.Item
          title="Classement"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: "medal", type: "material-community", color: "white" }}
        />
      </Tab>
    </View>
  );
};

export default ChallengeDetails;
