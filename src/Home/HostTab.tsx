import { GameListing } from "Home/PlayTab/GameListing/GameListing";
import { useGetGames } from "lib/utils/hooks/use-get-games";

export const HostTab = () => {
  const { data: gamesResults } = useGetGames();
  const games = gamesResults
    ?.map((result) => ({
      num: result.game_idx,
      created: new Date(result.created),
    }))
    .sort(({ created: a }, { created: b }) => b.getTime() - a.getTime());

  return (
    <>
      {games?.map((game) => (
        <GameListing
          key={game.num}
          urlPath="/host"
          num={game.num}
          created={game.created}
        />
      ))}
    </>
  );
};
