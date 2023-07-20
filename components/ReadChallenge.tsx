import { IParticipantChallenge } from "../interfaces/IChallenge";
import { useMutation } from "@apollo/client";
import { IUser } from "../interfaces/IUser";
import { useEffect, useState } from "react";
import { format, differenceInDays } from "date-fns";
import { Text, View } from "react-native";
import { Divider, Icon, ListItem } from "@rneui/themed";

const ReadChallenge = (props: {
  challengeWithParticipant: IParticipantChallenge;
  userToChallengeId: number;
  toggleUserStatus: (status: "participant" | "owner" | null) => void;
  userStatus: "participant" | "owner" | null;
}) => {
  const challenge = props.challengeWithParticipant;
  const [isCopied, setIsCopied] = useState(false);

  function calculateDaysRemaining() {
    if (challenge && challenge.start_date) {
      const today = new Date();

      console.log(challenge);

      const challengeStartDate = challenge.start_date
        ? new Date(challenge.start_date)
        : undefined;

      if (challengeStartDate) {
        const daysRemaining = differenceInDays(challengeStartDate, today);
        if (!challenge.is_in_progress && daysRemaining >= 0) {
          const daysRemainingLabel = daysRemaining <= 1 ? 1 : daysRemaining;
          const day = daysRemainingLabel === 1 ? "jour" : "jours";
          return `Patience ! Le challenge commence dans ${daysRemainingLabel} ${day}.`;
        } else if (challenge.is_in_progress && daysRemaining <= 0) {
          return "Le challenge est en cours !";
        } else {
          return "Le challenge est terminé.";
        }
      }
    } else {
      console.log("La date de début du challenge est manquante.");
    }
  }

  useEffect(() => {
    challenge;
  }, [challenge]);

  return (
    <View>
      <Text>{challenge.name}</Text>
      <Text>
        Date de début: {format(new Date(challenge.start_date), "yyyy-MM-dd")}
      </Text>
      <Text>Durée : {challenge.length}</Text>
      <Text>Créé par : {challenge.createdBy.name}</Text>

      <Divider />

      <Text>Participants:</Text>

      <View>
        {challenge.userToChallenges.map((participant: { user: IUser }) => (
          <ListItem key={participant.user.id}>
            <Icon
              name={
                participant.user.id === challenge.createdBy.id
                  ? "crown-circle"
                  : "account-circle"
              }
              type="material-community"
              color="grey"
            />
            <ListItem.Content>
              <ListItem.Title>{participant.user.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>

      <Divider />
      <Text>{calculateDaysRemaining()}</Text>
    </View>
  );
};

export default ReadChallenge;
