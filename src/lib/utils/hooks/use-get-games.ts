import { useQuery } from "lib/utils/hooks/use-query";
import { isArray } from "lib/utils/typeguard/is-array";
import { isNumber, isString } from "lib/utils/typeguard/is-primitive";
import { makeIsShape } from "lib/utils/typeguard/is-shape";

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
  const { data, ...rest } = useQuery<GetGamesResult[]>({
    path: "/api/games",
    validator,
  });

  return {
    data: data?.map((result) => ({
      lobbyId: result.lobby_id,
      created: new Date(result.created),
    })),
    ...rest,
  };
};
