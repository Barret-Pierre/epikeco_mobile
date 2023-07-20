import { IChallenge } from "../interfaces/IChallenge";
import { IAction } from "../interfaces/IAction";
import ActionTile from "./ActionTile";
import { Text, View } from "react-native";

const ActionsList = (props: {
  challenge: IChallenge;
  userStatus?: null | "participant" | "owner";
  toggleEditableActionsMode?: () => void;
}) => {
  return (
    <View>
      <Text>Actions:</Text>
      {props.challenge.actions.map((action: IAction) => {
        return (
          <ActionTile
            action={action}
            challenge={props.challenge}
            key={action.id}
          />
        );
      })}
    </View>
  );
};

export default ActionsList;
