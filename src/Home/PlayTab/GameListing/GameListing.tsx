import { Button } from "lib/Button/Button";
import { getFormattedTimeSince } from "lib/utils/get-formatted-time-since";
import { NavLink } from "react-router-dom";

interface GameOption {
  num: number;
  created: Date;
}

interface GameListingProps extends GameOption {
  urlPath?: string;
}

const BLOCK = "home_play-tab_game-listing";

export const GameListing = ({
  urlPath = "/play",
  num,
  created,
}: GameListingProps) => {
  return (
    <p>
      {`Game #${num} - created ${getFormattedTimeSince(created)}`}
      <NavLink to={`${urlPath}/${num}`}>
        <Button size="sm" marginLeft="lg" label="Join" />
      </NavLink>
    </p>
  );
};
