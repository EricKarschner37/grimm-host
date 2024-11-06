import { Button } from "lib/Button/Button";
import { getFormattedTimeSince } from "lib/utils/get-formatted-time-since";
import { NavLink } from "react-router-dom";

interface GameOption {
  lobbyId: string;
  created: Date;
}

interface GameListingProps extends GameOption {
  urlPath?: string;
}

const BLOCK = "home_play-tab_game-listing";

export const GameListing = ({
  urlPath = "/play",
  lobbyId,
  created,
}: GameListingProps) => {
  return (
    <p>
      {`Lobby id: ${lobbyId} - created ${getFormattedTimeSince(created)}`}
      <NavLink to={`${urlPath}/${lobbyId}`}>
        <Button size="sm" marginLeft="lg" label="Join" />
      </NavLink>
    </p>
  );
};
