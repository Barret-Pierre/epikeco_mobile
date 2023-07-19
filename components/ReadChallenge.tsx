import { IParticipantChallenge } from "../interfaces/IChallenge";
import { useMutation } from "@apollo/client";
import { IUser } from "../interfaces/IUser";
import { useEffect, useState } from "react";
import { format } from "date-fns";
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

      if (new Date(challenge.end_date) < today) {
        return "Ce challenge est terminé.";
      }

      const challengeStartDate = challenge.start_date
        ? new Date(challenge.start_date)
        : undefined;

      if (challengeStartDate) {
        // Calcul en millisecondes entre aujourd'hui et la date de début du challenge
        const timeDiff = challengeStartDate.getTime() - today.getTime();
        // Calcul du nombre de jours restants (1000 = nombre de millisecondes dans une seconde, 3600 secondes dans une heure)
        const milisecondInADay = 1000 * 3600 * 24;
        // Math.ceil arrondi à l'entier supérieur
        const daysRemaining = Math.ceil(timeDiff / milisecondInADay);

        if (daysRemaining === 0) {
          return "Le challenge est en cours !";
        } else {
          return `Patience ! Le challenge commence dans ${daysRemaining} jours`;
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
