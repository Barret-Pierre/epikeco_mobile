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
      {props.userStatus === "owner" &&
        props.challenge.is_in_progress === false && (
          <button onClick={props.toggleEditableActionsMode}>Modifier</button>
        )}

      {props.challenge.actions.map((action: IAction) => {
        return <ActionTile action={action} challenge={props.challenge} />;
      })}
    </View>
  );
};

export default ActionsList;
