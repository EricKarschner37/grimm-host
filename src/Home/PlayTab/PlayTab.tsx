import { GameListing } from "Home/PlayTab/GameListing/GameListing";
import { EmptyState } from "lib/EmptyState/EmptyState";
import { useGetGames } from "lib/utils/hooks/use-get-games";

export const PlayTab = () => {
  const { data: gamesResults } = useGetGames();
  const games = gamesResults
    ?.map((result) => ({
      num: result.game_idx,
      created: new Date(result.created),
    }))
    .sort(({ created: a }, { created: b }) => b.getTime() - a.getTime());

  return (
    <>
      {games ? (
        games.map((game) => (
          <GameListing key={game.num} num={game.num} created={game.created} />
        ))
      ) : (
        <EmptyState message="There are currently no active games. Try refreshing the page!" />
      )}
    </>
  );
};
