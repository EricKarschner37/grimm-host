import { GameListing } from "./GameListing/GameListing";
import { EmptyState } from "../../lib/EmptyState/EmptyState";
import { useGetGames } from "../../lib/utils/hooks/use-get-games";

export const PlayTab = () => {
  const { data: gamesResults } = useGetGames();
  const games = gamesResults
    ?.map((result) => ({
      lobbyId: result.lobby_id,
      created: new Date(result.created),
    }))
    .sort(({ created: a }, { created: b }) => b.getTime() - a.getTime());

  return (
    <>
      {games && games.length > 0 ? (
        games.map((game) => (
          <GameListing
            key={game.lobbyId}
            lobbyId={game.lobbyId}
            created={game.created}
          />
        ))
      ) : (
        <EmptyState message="There are currently no active games. Try refreshing the page!" />
      )}
    </>
  );
};
