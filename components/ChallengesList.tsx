import { useQuery } from "@apollo/client";
import { IChallenge } from "../interfaces/IChallenge";
import { Text, View } from "react-native";
import { readMyChallenges } from "../graphql/readMyChallenges";

const ChallengesList = () => {
  const { data } = useQuery<{ readMyChallenges: IChallenge[] }>(
    readMyChallenges,
    { fetchPolicy: "cache-and-network" }
  );

  console.log("All challenges dashboard", data);

  return (
    <View>
      {data?.readMyChallenges.map((challenge) => (
        <Text key={challenge.id}>{challenge.name}</Text>
      ))}
    </View>
  );
};

export default ChallengesList;
