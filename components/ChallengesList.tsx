import { useQuery } from "@apollo/client";
import { IChallenge } from "../interfaces/IChallenge";
import { Text, View } from "react-native";
import { readMyChallenges } from "../graphql/readMyChallenges";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

const ChallengesList = ({
  onSelect,
}: {
  onSelect: (challengeId: string) => void;
}) => {
  const { data } = useQuery<{ readMyChallenges: IChallenge[] }>(
    readMyChallenges,
    { variables: { filter: "isInProgress" }, fetchPolicy: "cache-and-network" }
  );
  const [selectedChallengeId, setSelectedChallengeId] = useState("");

  useEffect(() => {
    onSelect(selectedChallengeId);
  }, [selectedChallengeId]);

  console.log("All challenges dashboard", JSON.stringify(data, null, 4));

  const formatData = (data: { readMyChallenges: IChallenge[] }) => {
    const newData = [];
    for (const challenge of data.readMyChallenges) {
      newData.push({ key: challenge.id, value: challenge.name });
    }
    return newData;
  };

  return (
    <View>
      {data?.readMyChallenges && data?.readMyChallenges.length > 0 ? (
        <SelectList
          setSelected={(key: string) => setSelectedChallengeId(key)}
          data={formatData(data)}
          defaultOption={formatData(data)[0]}
          save="key"
        />
      ) : (
        <Text>Vous ne participez à aucun challenge actuellement </Text>
      )}
    </View>
  );
};

export default ChallengesList;
