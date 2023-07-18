import { IChallenge } from "../interfaces/IChallenge";
import { Text, View } from "react-native";

const ChallengeDetails = ({ challenge }: { challenge: IChallenge }) => {
  return (
    <View>
      <Text>
        {challenge.id} - {challenge.is_in_progress}
      </Text>
    </View>
  );
};

export default ChallengeDetails;
