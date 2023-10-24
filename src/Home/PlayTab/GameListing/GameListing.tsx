import { Button } from "lib/Button/Button";
import { getFormattedTimeSince } from "lib/utils/get-formatted-time-since";
import { NavLink } from "react-router-dom";

interface GameOption {
  num: number;
  created: Date;
}

const BLOCK = "home_play-tab_game-listing";

export const GameListing = ({ num, created }: GameOption) => {
  return (
    <p>
      {`Game #${num} - created ${getFormattedTimeSince(created)}`}
      <NavLink to={`/play/${num}`}>
        <Button size="sm" marginLeft="lg" label="Join" />
      </NavLink>
    </p>
  );
};
