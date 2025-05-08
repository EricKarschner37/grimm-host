import { Text } from "lib/Text/Text";
import { PlayerSocketWrapper, usePlayerSocket } from "Play/play.hooks";
import { GameMode, GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Suspender } from "lib/Suspender";
import React, { ReactNode } from "react";
import "./page-player-active.scss";
import { Flex } from "lib/Flex";
import { ClientCategories } from "common/ClientCategories/ClientCategories";
import { Wager } from "Play/PagePlayerActive/Wager";
import { Response } from "Play/PagePlayerActive/Response";
import { Clue } from "PageBoard/Clue/Clue";
import { FlexItem } from "lib/FlexItem/FlexItem";

export interface PagePlayerActiveProps {
  username: string;
  lobbyId: string;
  gameMode?: GameMode;
}

interface PagePlayerActiveContentProps {
  username: string;
  socket: PlayerSocketWrapper & { readyState: WebSocket["OPEN"] };
  gameState: GameState;
  gameMode: GameMode;
}

const BLOCK = "page-player-active";

const PagePlayerActiveContent = ({
  username,
  socket,
  gameState,
  gameMode,
}: PagePlayerActiveContentProps) => {
  let mainContent: ReactNode | null = null;
  const actionTray: ReactNode[] = [];

  const balance = gameState.players[username]?.balance ?? -1;

  const canBuzz = gameState.type === "clue" && gameState.buzzersOpen;

  if (
    gameState.type === "board" &&
    gameState.bareRound.round_type === "DefaultRound"
  ) {
    console.log(gameState.activePlayer, username);
    mainContent = (
      <ClientCategories
        bareRound={gameState.bareRound}
        cluesShown={gameState.cluesShown}
        socket={socket}
        canReveal={gameState.activePlayer === username}
      />
    );
  }

  if (gameState.type === "response" || gameState.type === "final-clue" || gameState.type === "clue") {
	const shouldShowResponse = gameState.type === "response" || gameState.respondedPlayers.includes(username);

    mainContent = (
      <Clue
        category={gameState.category}
        cost={String(gameState.cost)}
        clue={gameState.clue}
        response={shouldShowResponse ? gameState.response : undefined}
      />
    );
  }

  if (gameState.type === "clue") {
    if (gameState.buzzedPlayer === username) {
      actionTray.push(<Text size="lg" text="Buzzed in!" />);
      if (gameMode === "hostless" && !gameState.respondedPlayers.includes(username)) {
	actionTray.push(<Button label="Reveal Answer" onClick={socket.reportResponded} />);
      } else if (gameMode === "hostless") {
	actionTray.push(<Button label="Incorrect" onClick={() => socket.correct(false)} />);
	actionTray.push(<Button label="Correct" onClick={() => socket.correct(true)} />);
      }
    } else if (gameState.buzzedPlayer) {
      actionTray.push(<Text text={`${gameState.buzzedPlayer} is buzzed in`} />);
    }
  }

  if (gameState.type === "daily-double") {
    mainContent = (
      <Clue category={gameState.category} cost={"???"} clue={"Daily Double!"} />
    );

    if (gameState.activePlayer === username) {
      actionTray.push(
        <Wager socket={socket} gameState={gameState} balance={balance} />
      );
    }
  }

  if (gameState.type === "final-wager") {
    mainContent = (
      <Clue category={gameState.category} cost="???" clue="Final Jeopardy!" />
    );
    actionTray.push(
      <Wager balance={balance} socket={socket} gameState={gameState} />
    );
  }

  if (gameState.type === "final-clue") {
    actionTray.push(<Response socket={socket} gameState={gameState} />);
  }

  return (
    <Flex isFullHeight isFullWidth direction="column" align="stretch">
      <Flex
        justify="space-between"
        align="center"
        className={`${BLOCK}_header`}
        isFullWidth
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
      <FlexItem className={`${BLOCK}_main-content-container`} basis={0} grow>
        {mainContent}
      </FlexItem>
	  <Flex gap="4px" justify="center" align="center" direction="column" isFullWidth>
      <Flex gap="4px" justify="center" align="center" direction="row" marginBottom="md">
        {actionTray}
      </Flex>
          <Button
            size="xl"
            label="Buzz"
            variant={canBuzz ? "primary" : "default"}
            marginBottom="lg"
            onClick={socket.buzz}
          />
		  </Flex>
    </Flex>
  );
};

export const PagePlayerActive = ({
  username,
  lobbyId,
  gameMode
}: PagePlayerActiveProps) => {
  const [gameState, setGameState] = React.useState<GameState | null>(null);
  const socket = usePlayerSocket({ username, lobbyId, setGameState });

  return (
    <Suspender
      shouldRender={(props): props is PagePlayerActiveContentProps =>
        props.gameState !== null && props.gameMode != null
      }
      renderEmpty={() => <p>Connecting...</p>}
      props={{ username, socket, gameState, gameMode }}
      render={PagePlayerActiveContent}
    />
  );
};
