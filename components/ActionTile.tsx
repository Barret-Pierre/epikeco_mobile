import React, {
  ReactComponentElement,
  SyntheticEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IAction } from "../interfaces/IAction";
import { IChallenge } from "../interfaces/IChallenge";
import { createSuccess } from "../graphql/createSuccess";
import { useMutation, useQuery } from "@apollo/client";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { readMyChallengeSuccesses } from "../graphql/readMyChallengeSuccess";
import { deleteMySuccess } from "../graphql/deleteMySuccess";
import { ISuccess } from "../interfaces/ISuccess";

import { readChallengeLeaderboard } from "../graphql/readChallengeLeaderboard";

import { isToday } from "date-fns";
import { CheckBox, ListItem } from "@rneui/themed";
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  NativeTouchEvent,
  View,
} from "react-native";
import { CheckBoxIconProps } from "@rneui/base/dist/CheckBox/components/CheckBoxIcon";

const ActionTile = (props: { action: IAction; challenge: IChallenge }) => {
  const startDate = new Date(props.challenge.start_date).setHours(0, 0, 0, 0);
  const actionId = props.action.id;
  const challengeId = props.challenge.id;

  const [expanded, setExpanded] = useState(false);

  const { data } = useQuery<{ readMyChallengeSuccesses: ISuccess[] }>(
    readMyChallengeSuccesses,
    {
      variables: {
        challengeId: props.challenge.id,
      },
    }
  );

  // TODO refetch readChallengerLeaderboard (score)
  const { data: particpant } = useQuery<any>(readChallengeLeaderboard, {
    variables: { challengeId },
  });

  const [createSuccessMutation] = useMutation(createSuccess, {
    refetchQueries: [readMyChallengeSuccesses, readChallengeLeaderboard],
  });

  const [deleteMySuccessMutation] = useMutation(deleteMySuccess, {
    refetchQueries: [readMyChallengeSuccesses, readChallengeLeaderboard],
  });

  const [successesMap, setSuccessesMap] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    const keys: any = {};

    if (data && data.readMyChallengeSuccesses) {
      for (const success of data.readMyChallengeSuccesses as ISuccess[]) {
        const successDate = new Date(success.date);

        keys[`${format(successDate, "yyyy-MM-dd")}-${success.action.id}`] =
          success.id;
      }
    }
    setSuccessesMap(keys);
  }, [data]);

  const isChecked = (i: number, actionId: string): boolean => {
    const key = `${format(addDays(startDate, i), "yyyy-MM-dd")}-${actionId}`;
    return key in successesMap;
  };

  async function validateSuccess(value: boolean, i: number) {
    // addDays est une fonction de format/date-fns
    const successDate = format(addDays(startDate, i), "yyyy-MM-dd");
    const successKey = `${successDate}-${actionId}`;

    if (!value) {
      try {
        await createSuccessMutation({
          variables: {
            data: {
              action: {
                id: actionId,
              },
              challenge: {
                id: challengeId,
              },
              date: format(addDays(startDate, i), "yyyy-MM-dd"),
            },
          },
        });
        console.log("Success create !");
      } catch {
        console.log("Error with success create");
      }
    } else {
      try {
        await deleteMySuccessMutation({
          variables: {
            data: {
              id: successesMap[successKey],
            },
          },
        });
        console.log("Success removed !");
      } catch (error) {
        console.log(
          "error with success removed:",
          JSON.stringify(error, null, 4)
        );
      }
    }
  }

  console.log("Lenght of challenge:", props.challenge.length);

  function isDisabled(i: number): boolean {
    const dateToday = new Date();
    const endDate = addDays(dateToday, props.challenge.length);
    const succesDate = addDays(startDate, i);
    if (dateToday >= succesDate && dateToday <= endDate) {
      return false;
    } else {
      return true;
    }
  }

  const checkboxes = useMemo(() => {
    const newCheckboxes = [];
    for (let i = 0; i < props.challenge.length; i++) {
      const checkboxDate = addDays(startDate, i);
      const isCurrentDay = isToday(checkboxDate);
      const checkboxStyle = isCurrentDay ? { border: "3px solid #00897b" } : {};

      newCheckboxes.push(
        <CheckBox
          key={i}
          checked={isChecked(i, actionId)}
          disabled={isDisabled(i)}
          onPress={() => validateSuccess(isChecked(i, actionId), i)}
          iconType="material-community"
          checkedIcon="checkbox-outline"
          uncheckedIcon={"checkbox-blank-outline"}
          title={`J${i + 1}`}
        />
      );
    }
    return newCheckboxes;
  }, [successesMap, props.challenge]);

  return (
    <View>
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>{props.action.title}</ListItem.Title>
            <ListItem.Subtitle>Tap to expand</ListItem.Subtitle>
          </ListItem.Content>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>{props.action.description}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <ListItem.Content>{checkboxes}</ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
    </View>
  );
};

export default ActionTile;
