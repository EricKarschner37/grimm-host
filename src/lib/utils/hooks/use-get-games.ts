import { useQuery } from "lib/utils/hooks/use-query";
import { isArray } from "lib/utils/typeguard/is-array";
import { isObject } from "lib/utils/typeguard/is-object";
import { isNumber } from "lib/utils/typeguard/is-primitive";
import { makeIsShape } from "lib/utils/typeguard/is-shape";

export interface GetGamesResult {
  game_idx: number;
  created: number; // created timestamp in seconds
}

const arrayItemValidator = makeIsShape<GetGamesResult>({
  game_idx: isNumber,
  created: isNumber,
});

const validator = (obj: any): obj is GetGamesResult[] =>
  isArray(obj) && obj.every(arrayItemValidator);

export const useGetGames = () => {
  return useQuery<GetGamesResult[]>({
    path: "/api/games",
    validator,
  });
};
