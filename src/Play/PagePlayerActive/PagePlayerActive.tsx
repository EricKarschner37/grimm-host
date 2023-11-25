import { Clue } from "Play/Clue/Clue";
import { Text } from "lib/Text/Text";
import { PlayerSocketWrapper, usePlayerSocket } from "Play/play.hooks";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Suspender } from "lib/Suspender";
import React, { ReactNode } from "react";
import "./page-player-active.scss";
import { Flex } from "lib/Flex";
import { ClientCategories } from "common/ClientCategories/ClientCategories";
import { SmallSquare } from "common/SmallSquare";
import { Wager } from "Play/PagePlayerActive/Wager";
import { Response } from "Play/PagePlayerActive/Response";

export interface PagePlayerActiveProps {
  username: string;
  gameIndex: number;
}

interface PagePlayerActiveContentProps {
  username: string;
  socket: PlayerSocketWrapper & { readyState: WebSocket["OPEN"] };
  gameState: GameState;
}

const BLOCK = "page-player-active";

const PagePlayerActiveContent = ({
  username,
  socket,
  gameState,
}: PagePlayerActiveContentProps) => {
  let mainContent: ReactNode | null = null;
  const actionTray: ReactNode[] = [];

  const balance = gameState.players[username]?.balance ?? -1;

  const canBuzz = gameState.type === "clue" && gameState.buzzersOpen;

  if (gameState.type === "board") {
    mainContent = <ClientCategories categories={gameState.categories} />;
  }

  if (gameState.type === "response") {
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
  }

  if (gameState.type === "clue" || gameState.type === "final-clue") {
    mainContent = (
      <SmallSquare>
        <Clue
          category={gameState.category}
          cost={String(gameState.cost)}
          clue={gameState.clue}
        />
      </SmallSquare>
    );
  }
  if (gameState.type === "clue") {
    if (gameState.buzzedPlayer === username) {
      actionTray.push(<Text size="lg" text="Buzzed in!" />);
    } else if (gameState.buzzedPlayer) {
      actionTray.push(<Text text={`${gameState.buzzedPlayer} is buzzed in`} />);
    } else {
      actionTray.push(
        <>
          <Button
            size="xl"
            label="Buzz"
            variant={canBuzz ? "primary" : "default"}
            marginBottom="lg"
            onClick={socket.buzz}
          />
        </>
      );
    }
  }

  if (gameState.type === "daily-double") {
    mainContent = (
      <SmallSquare>
        <Clue
          category={gameState.category}
          cost={"???"}
          clue={"Daily Double!"}
        />
      </SmallSquare>
    );

    if (gameState.activePlayer === username) {
      actionTray.push(
        <Wager socket={socket} gameState={gameState} balance={balance} />
      );
    }
  }

  if (gameState.type === "final-wager") {
    mainContent = (
      <SmallSquare>
        <Clue category={gameState.category} cost="???" clue="Final Jeopardy!" />
      </SmallSquare>
    );
    actionTray.push(
      <Wager balance={balance} socket={socket} gameState={gameState} />
    );
  }

  if (gameState.type === "final-clue") {
    actionTray.push(<Response socket={socket} gameState={gameState} />);
  }

  return (
    <Flex isFullHeight isFullWidth direction="column" align="center">
      <Flex
        justify="space-between"
        align="center"
        className={`${BLOCK}_header`}
      >
        <Text
          className={`${BLOCK}_header_left`}
          marginLeft="md"
          text="Jeopardy!"
          size="lg"
        />
        <Text size="lg" text={username} />
        <Text
          className={`${BLOCK}_header_right`}
          marginRight="md"
          size="lg"
          text={`$${balance}`}
        />
      </Flex>
      {mainContent}
      <div style={{ flexGrow: 1 }} />
      <Flex gap="4px" justify="center" direction="row" marginBottom="lg">
        {actionTray}
      </Flex>
    </Flex>
  );
};

export const PagePlayerActive = ({
  username,
  gameIndex,
}: PagePlayerActiveProps) => {
  const [gameState, setGameState] = React.useState<GameState | null>(null);
  const socket = usePlayerSocket({ username, gameIndex, setGameState });

  return (
    <Suspender
      shouldRender={(props): props is PagePlayerActiveContentProps =>
        props.gameState !== null
      }
      renderEmpty={() => <p>Connecting...</p>}
      props={{ username, socket, gameState }}
      render={PagePlayerActiveContent}
    />
  );
};
