import { Button } from "lib/Button/Button";
import { Text } from "lib/Text";
import { Input } from "lib/Input/Input";
import { Spacing } from "lib/Spacing/Spacing";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex } from "lib/Flex";
import './board-tab.scss';
import { ToggleSwitch } from "lib/ToggleSwitch/ToggleSwitch";
import { GameMode } from "common/types/game-state.types";

const BASE_URL = process.env.REACT_APP_API_URL;

const BLOCK = 'home__board-tab';

export const BoardTab = () => {
  const [gameNumInput, setGameNumInput] = React.useState<string>("");
  const [gameMode, setGameMode] = React.useState<GameMode>('host');

  const navigate = useNavigate();

  const handleGameNumInputChange = (value: string) => {
    const inputAsNumber = Number(value);
    if (Number.isNaN(inputAsNumber)) {
      return;
    }

    setGameNumInput(value);
  };

  const launchGameCallback = () => {
    fetch(`${BASE_URL}/api/start/${gameNumInput}`, {
      method: "POST",
      body: JSON.stringify({mode: gameMode}),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error("Couldn't reach Jeopardy server");
        }
      })
      .then((obj) => {
        if ("lobby_id" in obj) {
          navigate(String(obj.lobby_id));
        }
      })
      .catch((reason) => console.log(reason));
  };

  return (
    <form
      className={`${BLOCK}__container`}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Text textStyle="bold" text="Options:" className={`${BLOCK}__section-header`} />
      	<Text margin="none" variant="secondary" text="Game ID:" />
        <Input
          onChange={handleGameNumInputChange}
          value={gameNumInput}
          hint="J! Archive Game ID"
	  className={`${BLOCK}__game-id-input`}
        />
      	<Text margin="none" variant="secondary" text="Host:" />
	<ToggleSwitch isChecked={gameMode === 'host'} onToggle={() => setGameMode(gameMode === 'host' ? 'hostless' : 'host')} />
        <Button
	className={`${BLOCK}__submit-button`}
          size="md"
          label="Launch"
	  marginTop="lg"
          onClick={launchGameCallback}
        />
    </form>
  );
};
