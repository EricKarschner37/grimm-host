import { PlayerSocketWrapper, usePlayerSocket } from "Play/play.hooks";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Suspender } from "lib/Suspender";
import React from "react";

export interface ActivePlayerScreenProps {
  username: string;
  gameIndex: number;
}

interface ActivePlayerScreenContentProps {
  username: string;
  socket: PlayerSocketWrapper & { readyState: WebSocket["OPEN"] };
  gameState: GameState;
}

const ActivePlayerScreenContent = ({
  username,
  socket,
  gameState,
}: ActivePlayerScreenContentProps) => {
  if (gameState.type === "board") {
    return gameState.categories.map((category) => <p>{category}</p>);
  }
  if (gameState.type === "response") {
    return (
      <>
        <p>{gameState.category}</p>
        <p>{gameState.clue}</p>
        <p>{gameState.response}</p>
      </>
    );
  }
  return (
    <>
      <p>{username}</p>
      <Button label="Buzz" variant="primary" onClick={socket.buzz} />
    </>
  );
};

export const ActivePlayerScreen = ({
  username,
  gameIndex,
}: ActivePlayerScreenProps) => {
  const [gameState, setGameState] = React.useState<GameState | null>(null);
  const socket = usePlayerSocket({ username, gameIndex, setGameState });

  return (
    <Suspender
      shouldRender={(props: {
        socket: PlayerSocketWrapper;
      }): props is ActivePlayerScreenContentProps => gameState !== null}
      renderEmpty={() => <p>Connecting...</p>}
      props={{ username, socket, gameState }}
      render={ActivePlayerScreenContent}
    />
  );
};
