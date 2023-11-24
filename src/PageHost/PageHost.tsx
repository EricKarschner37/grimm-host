import { PlayerSelector } from "PageHost/PlayerSelector";
import { HostSocketWrapper, useHostSocket } from "PageHost/page-host.hooks";
import { Clue } from "Play/Clue/Clue";
import { ClientCategories } from "common/ClientCategories/ClientCategories";
import { SmallSquare } from "common/SmallSquare";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Flex } from "lib/Flex";
import { Suspender } from "lib/Suspender";
import { ToggleSwitch } from "lib/ToggleSwitch/ToggleSwitch";
import { Text } from "lib/Text";
import React, { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";

export interface PageHostContentProps {
  gameState: GameState;
  socket: HostSocketWrapper;
}

export const PageHostContent = ({
  gameState,
  socket,
}: PageHostContentProps) => {
  let mainContent: JSX.Element | null = null;
  const actionTray: ReactNode[] = [];

  if (gameState.type === "board") {
    mainContent = <ClientCategories categories={gameState.categories} />;
  }

  if (
    gameState.type === "clue" ||
    gameState.type === "response" ||
    gameState.type === "final-clue"
  ) {
    mainContent = (
      <SmallSquare>
        <Clue
          category={gameState.category}
          cost={String(gameState.cost)}
          clue={gameState.clue}
          response={gameState.response}
        />
      </SmallSquare>
    );

    if (gameState.type === "clue") {
      if (!gameState.buzzedPlayer) {
        actionTray.push(
          <Flex isFullWidth={false} gap="8px" align="center">
            Buzzers Open
            <ToggleSwitch
              isChecked={gameState.buzzersOpen}
              onToggle={
                gameState.buzzersOpen ? socket.closeBuzzers : socket.openBuzzers
              }
            />
          </Flex>
        );
      } else {
        actionTray.push(
          <Button
            label="Incorrect"
            variant="error"
            onClick={() => socket.reportPlayerCorrect(false)}
          />,
          <Button
            label="Correct"
            variant="success"
            onClick={() => socket.reportPlayerCorrect(true)}
          />
        );
      }
    }
  }

  if (gameState.type === "daily-double") {
    actionTray.push(<PlayerSelector gameState={gameState} socket={socket} />);
  }

  if (gameState.type === "final-wager") {
    mainContent = (
      <SmallSquare>
        <Clue category={gameState.category} cost="???" clue="Final Jeopardy!" />
      </SmallSquare>
    );
  }

  return (
    <Flex isFullHeight isFullWidth direction="column" align="center">
      {mainContent}
      <div style={{ flexGrow: 1 }} />
      {gameState.buzzedPlayer && (
        <Text text={`${gameState.buzzedPlayer} is buzzed in`} />
      )}
      <Flex justify="center" gap="6em" align="center" marginBottom="lg">
        {actionTray}
      </Flex>
    </Flex>
  );
};

export const PageHost = () => {
  const { gameIndex } = useParams<"gameIndex">();

  const [gameState, setGameState] = React.useState<GameState | null>(null);

  const indexNumber = parseInt(gameIndex ?? "NaN");
  const socket = useHostSocket({ gameIndex: indexNumber, setGameState });

  if (!gameIndex || Number.isNaN(indexNumber)) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <Suspender
      shouldRender={(props): props is PageHostContentProps =>
        props.gameState !== null
      }
      renderEmpty={() => <p>Connecting...</p>}
      props={{ gameState, socket }}
      render={PageHostContent}
    />
  );
};
