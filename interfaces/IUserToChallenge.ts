import { IUser } from "./IUser";
import { IChallenge } from "./IChallenge";

export interface IUserToChallenge {
  isAccepted?: boolean;
  challenge?: IChallenge;
  user?: IUser;
  challengeScore: number;
}
