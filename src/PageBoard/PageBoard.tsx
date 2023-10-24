import { Board, BoardProps } from "PageBoard/Board/Board";
import { useBoardSocket } from "PageBoard/page-board.hooks";
import { GameState } from "common/types/game-state.types";
import { Suspender } from "lib/Suspender";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

export const PageBoard = () => {
  const { gameIndex } = useParams<"gameIndex">();

  if (!gameIndex || Number.isNaN(gameIndex)) {
    return <Navigate to="/board" />;
  }

  return <PageBoardContent gameIndex={gameIndex} />;
};

const PageBoardContent = ({ gameIndex }: { gameIndex: string }) => {
  const [gameState, setGameState] = React.useState<GameState | null>(null);

  const socket = useBoardSocket({ gameIndex: gameIndex, setGameState });

  return (
    <Suspender
      render={Board}
      props={{ gameState, socket }}
      renderEmpty={() => <p>Connecting...</p>}
      shouldRender={(props: {
        gameState: GameState | null;
      }): props is BoardProps => gameState !== null}
    />
  );
};
