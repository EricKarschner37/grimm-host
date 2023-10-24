import { GameListing } from "Home/PlayTab/GameListing/GameListing";
import { useGetGames } from "lib/utils/hooks/use-get-games";

export const PlayTab = () => {
  const { data: gamesResults } = useGetGames();
  const games = gamesResults?.map((result) => ({
    num: result.game_idx,
    created: new Date(result.created),
  }));

  return (
    <>
      {games?.map((game) => (
        <GameListing key={game.num} num={game.num} created={game.created} />
      ))}
    </>
  );
};
