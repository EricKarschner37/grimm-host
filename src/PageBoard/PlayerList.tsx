import { BoardSocketWrapper } from "PageBoard/page-board.hooks";
import { Text } from "lib/Text";
import { GameState } from "common/types/game-state.types";
import { Panel } from "lib/Panel/Panel";
import React from "react";

export const PlayerList = ({
  gameState,
  socket,
}: {
  gameState: GameState;
  socket: BoardSocketWrapper;
}) => {
  const sorted = React.useMemo(
    () =>
      Object.entries(gameState.players).sort(
        ([, { balance: a }], [, { balance: b }]) => b - a
      ),
    [gameState.players]
  );
  return sorted.map(([name, player]) => (
    <Text text={`${name} - $${player.balance}`} />
  ));
};
