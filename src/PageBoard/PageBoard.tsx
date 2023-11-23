import { Board, BoardProps } from "PageBoard/Board/Board";
import { PlayerList } from "PageBoard/PlayerList";
import { useBoardSocket } from "PageBoard/page-board.hooks";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Flex } from "lib/Flex";
import { Panel } from "lib/Panel/Panel";
import { Suspender } from "lib/Suspender";
import { Text } from "lib/Text";
import { RightArrow } from "lib/icons/RightArrow";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

const PageBoardRedirector = () => {
  const { gameIndex } = useParams<"gameIndex">();

  if (!gameIndex || Number.isNaN(gameIndex)) {
    return <Navigate to="/board" />;
  }

  return <PageBoard gameIndex={gameIndex} />;
};

const PageBoard = ({ gameIndex }: { gameIndex: string }) => {
  const [gameState, setGameState] = React.useState<GameState | null>(null);

  const socket = useBoardSocket({ gameIndex: gameIndex, setGameState });

  return (
    <Suspender
      render={PageBoardContent}
      props={{ gameState, socket }}
      renderEmpty={() => <p>Connecting...</p>}
      shouldRender={(props: {
        gameState: GameState | null;
      }): props is BoardProps => gameState !== null}
    />
  );
};

const PageBoardContent = ({ gameState, socket }: BoardProps) => {
  return (
    <Flex isFullWidth isFullHeight direction="column">
      <Board gameState={gameState} socket={socket} />
      <Flex
        justify="space-evenly"
        align="center"
        padding="xl"
        isFullWidth
        direction="row"
        grow
      >
        <Panel paddingLeft="md" paddingRight="md">
          <PlayerList socket={socket} gameState={gameState} />
        </Panel>
        {gameState.round !== "final" && (
          <Button
            size="sm"
            variant="secondary"
            paddingTop="xs"
            paddingBottom="xs"
            onClick={
              gameState.round === "single"
                ? socket.startDouble
                : socket.startFinal
            }
            label="Skip Round"
            icon={RightArrow}
          />
        )}
      </Flex>
    </Flex>
  );
};

export { PageBoardRedirector as PageBoard };
