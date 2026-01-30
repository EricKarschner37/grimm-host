import { useQuery } from "./use-query";
import { isArray } from "../typeguard/is-array";
import { isObject } from "../typeguard/is-object";
import { isNumber, isString } from "../typeguard/is-primitive";
import { makeIsShape } from "../typeguard/is-shape";

export interface GetGamesResult {
  lobby_id: string;
  created: number; // created timestamp in seconds
}

const arrayItemValidator = makeIsShape<GetGamesResult>({
  lobby_id: isString,
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
