import { PlayerSelector } from "./PlayerSelector";
import { SocketStateIndicator } from '../common/SocketStateIndicator';
import { Header } from "../lib/Header/Header";
import { HostSocketWrapper, useHostSocket } from "./page-host.hooks";
import { ClientCategories } from "../common/ClientCategories/ClientCategories";
import { GameState } from "../common/types/game-state.types";
import { Button } from "../lib/Button/Button";
import { Flex } from "../lib/Flex";
import { Suspender } from "../lib/Suspender";
import { ToggleSwitch } from "../lib/ToggleSwitch/ToggleSwitch";
import { Text } from "../lib/Text";
import React, { ReactNode } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Clue } from "../PageBoard/Clue/Clue";
import { FlexItem } from "../lib/FlexItem/FlexItem";
import "./page-host.scss";

export interface PageHostContentProps {
  gameState: GameState;
  socket: HostSocketWrapper;
}

const BLOCK = "page_host";

export const PageHostContent = ({
  gameState,
  socket,
}: PageHostContentProps) => {
  let mainContent: JSX.Element | null = null;
  const actionTray: ReactNode[] = [];

  if (
    gameState.type === "board" &&
    gameState.bareRound.round_type === "DefaultRound"
  ) {
    mainContent = (
      <ClientCategories
        canReveal
        bareRound={gameState.bareRound}
        cluesShown={gameState.cluesShown}
        socket={socket}
      />
    );
  }

  if (
    gameState.type === "clue" ||
    gameState.type === "response" ||
    gameState.type === "final-clue"
  ) {
    mainContent = (
      <Clue
        category={gameState.category}
        cost={String(gameState.cost)}
        clue={gameState.clue}
        response={gameState.response}
      />
    );

	if (gameState.type === "final-clue") {
			actionTray.push(
			  <Button
			    label="Time's up!"
			    variant="error"
			    onClick={() => socket.forceContinue()} />
			)
	}

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
    mainContent = (
      <Clue category={gameState.category} cost={"???"} clue={"Daily Double!"} />
    );
    actionTray.push(<PlayerSelector gameState={gameState} socket={socket} />);
  }

  if (gameState.type === "final-wager") {
    mainContent = (
      <Clue category={gameState.category} cost="???" clue="Final Jeopardy!" />
    );
	actionTray.push(<Button label="End Wagers" variant="error" onClick={() => socket.forceContinue()} />)
  }

  return (
    <Flex isFullHeight isFullWidth direction="column" align="stretch">
      <Flex isFullWidth paddingX="md">
	    <Header>
		<Flex align="center" isFullWidth >
		  <Text
		    text="Jeopardy!"
			size="lg"
		  />
		  <FlexItem basis={0} grow />
		  <Text
		    text="Host"
			size="lg"
		  />
		  <SocketStateIndicator readyState={socket.readyState} />
		  <FlexItem basis={0} grow />
		</Flex>
		</Header>
      </Flex>
      <FlexItem basis={0} grow className={`${BLOCK}-main-content-container`}>
        {mainContent}
      </FlexItem>
      {gameState.buzzedPlayer && (
		<Flex justify="center" align="center" isFullWidth>
				<Text text={`${gameState.buzzedPlayer} is buzzed in`} />
		</Flex>
      )}
      <Flex justify="center" gap="6em" align="center" marginBottom="lg" isFullWidth>
        {actionTray}
      </Flex>
    </Flex>
  );
};

export const PageHost = () => {
  const { lobbyId } = useParams<"lobbyId">();

  const [gameState, setGameState] = React.useState<GameState | null>(null);

  const socket = useHostSocket({ lobbyId, setGameState });

  if (!lobbyId) {
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
