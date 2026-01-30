import { useQuery } from "./use-query";
import { isStringArray } from "../typeguard/is-typed-array";
import { isString } from "../typeguard/is-primitive";
import { GameMode } from "../../../common/types/game-state.types";

export interface GetGameResult {
  players: string[];
  categories: string[];
  mode: GameMode;
}

export interface GetGameArgs {
  lobbyId: string;
  enabled?: boolean;
}

const ENDPOINT = "/api/game/";

// TODO - Fix makeIsShape typing for property typeguards
// const validator = makeIsShape({
//   players: isArray,
//   categories: isArray,
// });

const validator = (obj: any): obj is GetGameResult =>
  "categories" in obj &&
  "players" in obj &&
  "mode" in obj &&
  isStringArray(obj.categories) &&
  isStringArray(obj.players) && isString(obj.mode);

export const useGetGame = ({ lobbyId, enabled }: GetGameArgs) => {
  return useQuery<GetGameResult>({
    path: `${ENDPOINT}${lobbyId}`,
    validator,
    enabled,
  });
};
