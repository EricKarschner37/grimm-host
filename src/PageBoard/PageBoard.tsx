import { Board, BoardProps } from "PageBoard/Board/Board";
import { PlayerList } from "PageBoard/PlayerList";
import { useBoardSocket } from "PageBoard/page-board.hooks";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Flex } from "lib/Flex";
import { FlexItem } from "lib/FlexItem/FlexItem";
import { Panel } from "lib/Panel/Panel";
import { Suspender } from "lib/Suspender";
import { RightArrowIcon } from "lib/icons/RightArrowIcon";
import React from "react";
import { Navigate, useParams } from "react-router-dom";

import "./page-board.scss";
import QRCode from "react-qr-code";
import { Text } from "lib/Text";

const PageBoardRedirector = () => {
  const { gameIndex } = useParams<"gameIndex">();

  if (!gameIndex || Number.isNaN(gameIndex)) {
    return <Navigate to="/board" />;
  }

  return <PageBoard gameIndex={gameIndex} />;
};

const BLOCK = "page_board";

const PageBoard = ({ gameIndex }: { gameIndex: string }) => {
  const [gameState, setGameState] = React.useState<GameState | null>(null);

  const socket = useBoardSocket({ gameIndex: gameIndex, setGameState });

  return (
    <Suspender
      render={PageBoardContent}
      props={{ gameState, socket, gameIndex: Number.parseInt(gameIndex) }}
      renderEmpty={() => <p>Connecting...</p>}
      shouldRender={(props: {
        gameState: GameState | null;
      }): props is PageBoardContentProps => gameState !== null}
    />
  );
};

interface PageBoardContentProps extends BoardProps {
  gameIndex: number;
}

const PageBoardContent = ({
  gameState,
  socket,
  gameIndex,
}: PageBoardContentProps) => {
  return (
    <div className={`${BLOCK}-container`}>
      <Flex isFullWidth isFullHeight direction="column">
        <FlexItem basis={0} grow>
          <Board gameState={gameState} socket={socket} />
        </FlexItem>
        <Flex
          justify="space-evenly"
          align="center"
          padding="xl"
          isFullWidth
          direction="row"
        >
          <Panel paddingLeft="md" paddingRight="md">
            <PlayerList socket={socket} gameState={gameState} />
          </Panel>
          <div style={{ textAlign: "center" }}>
            <QRCode
              size={128}
              value={`https://${window.location.host}/play/${gameIndex}`}
              width={28}
            />
            <Text variant="secondary" text="Scan to join!" />
          </div>
          {gameState.bareRound.round_type !== "FinalRound" && (
            <Button
              size="sm"
              variant="secondary"
              paddingTop="xs"
              paddingBottom="xs"
              onClick={socket.nextRound}
              label="Skip Round"
              icon={RightArrowIcon}
            />
          )}
        </Flex>
      </Flex>
    </div>
  );
};

export { PageBoardRedirector as PageBoard };
