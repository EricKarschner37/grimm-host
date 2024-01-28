import { useQuery } from "lib/utils/hooks/use-query";
import { isStringArray } from "lib/utils/typeguard/is-typed-array";

export interface GetGameResult {
  players: string[];
  categories: string[];
}

export interface GetGameArgs {
  gameIndex: number;
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
  isStringArray(obj.categories) &&
  isStringArray(obj.players);

export const useGetGame = ({ gameIndex, enabled }: GetGameArgs) => {
  return useQuery<GetGameResult>({
    path: `${ENDPOINT}${gameIndex}`,
    validator,
    enabled,
  });
};
