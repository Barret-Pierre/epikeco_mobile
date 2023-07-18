import { useQuery } from "@apollo/client";
import { IChallenge } from "../interfaces/IChallenge";
import { Text, View } from "react-native";
import { readMyChallenges } from "../graphql/readMyChallenges";
import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";

const ChallengesList = ({
  onSelect,
  onRefetchChallenge,
}: {
  onSelect: (challengeId: string) => void;
  onRefetchChallenge: () => void;
}) => {
  const { data } = useQuery<{ readMyChallenges: IChallenge[] }>(
    readMyChallenges,
    { fetchPolicy: "cache-and-network" }
  );
  const [selectedChallengeId, setSelectedChallengeId] = useState("");

  useEffect(() => {
    onSelect(selectedChallengeId);
    console.log("SELECTEDChallengeId", selectedChallengeId);
    onRefetchChallenge();
  }, [selectedChallengeId]);

  console.log("All challenges dashboard", data);

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
