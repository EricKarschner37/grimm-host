import { useQuery } from "lib/utils/hooks/use-query";
import { isMaybe } from "lib/utils/typeguard/is-maybe";
import { isNumber, isString } from "lib/utils/typeguard/is-primitive";
import { makeIsShape } from "lib/utils/typeguard/is-shape";
import {
  isStringArray,
  isTypedArray,
} from "lib/utils/typeguard/is-typed-array";

export interface GetGamesResult {
  lobby_id: string;
  created: number; // created timestamp in seconds
  players?: string[];
}

const arrayItemValidator = makeIsShape<GetGamesResult>({
  lobby_id: isString,
  created: isNumber,
  players: isMaybe(isStringArray),
});

const validator = isTypedArray(arrayItemValidator);
export const useGetGames = () => {
  const { data, ...rest } = useQuery<GetGamesResult[]>({
    path: "/api/games",
    validator,
  });

  return {
    data: data?.map((result) => ({
      lobbyId: result.lobby_id,
      created: new Date(result.created),
      players: result.players ?? ["eric", "Abbey", "!@#$(!)", "four", "five"],
    })),
    ...rest,
  };
};
