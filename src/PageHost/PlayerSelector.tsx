import { HostSocketWrapper } from "./page-host.hooks";
import { GameState, Player } from "../common/types/game-state.types";
import { Button } from "../lib/Button/Button";
import { Select } from "../lib/Select/Select";
import { Text } from "../lib/Text/Text";
import React from "react";

export const PlayerSelector = ({
  gameState,
  socket,
}: {
  gameState: GameState;
  socket: HostSocketWrapper;
}) => {
  const [hasSubmitted, setHasSubmitted] = React.useState(
    Boolean(gameState.activePlayer)
  );
  const [selectedPlayer, setSelectedPlayer] = React.useState<
    Player | undefined
  >(undefined);

  console.log(selectedPlayer);

  if (hasSubmitted) {
    return (
      <span>
        <Text isInline text={`Selected Player: ${gameState.activePlayer}`} />
        <Button
          marginLeft="md"
          onClick={() => setHasSubmitted(false)}
          label="Undo"
        />
      </span>
    );
  }

  return (
    <span>
      <Select
        onChange={setSelectedPlayer}
        selected={selectedPlayer?.name}
        items={Object.entries(gameState.players).map(([name, player]) => ({
          value: player,
          key: name,
          label: name,
        }))}
      />
      <Button
        marginLeft="md"
        label="Submit"
        onClick={() => {
          if (!selectedPlayer) return;
          socket.choosePlayer(selectedPlayer.name);
          setHasSubmitted(true);
        }}
      />
    </span>
  );
};
