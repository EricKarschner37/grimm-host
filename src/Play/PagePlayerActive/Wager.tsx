import { PlayerSocketWrapper } from "Play/play.hooks";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Flex } from "lib/Flex";
import { Input } from "lib/Input/Input";
import { Slider } from "lib/Slider/Slider";
import { Text } from "lib/Text";
import React from "react";

const validateInProgress = (value: string) => {
  return value === "-" || value === "" || !Number.isNaN(Number.parseInt(value));
};

const validateWager = (
  wager: number,
  gameState: GameState,
  balance: number
) => {
  const max = Math.max(balance, gameState.bareRound.default_max_wager);

  return !Number.isNaN(wager) && wager <= max && wager >= 5;
};

export const Wager = ({
  socket,
  gameState,
  balance,
}: {
  socket: PlayerSocketWrapper;
  gameState: GameState;
  balance: number;
}) => {
  const maxWager = Math.max(balance, gameState.bareRound.default_max_wager);

  const [wagerValue, setWagerValue] = React.useState(maxWager);
  const [submittedWager, setSubmittedWager] = React.useState<
    number | undefined
  >(undefined);

  if (submittedWager !== undefined) {
    return (
      <span>
        <Text isInline text={`You wagered: $${submittedWager}`} />
        <Button
          marginLeft="md"
          onClick={() => setSubmittedWager(undefined)}
          label="Undo"
        />
      </span>
    );
  }

  return (
    <Flex direction="column" gap="8px" align="center" isFullWidth>
      <div style={{ width: "60%" }}>
        <Slider
          min={5}
          max={maxWager}
          value={wagerValue}
          onValueChange={setWagerValue}
          increment={10}
        />
      </div>
      <Button
        label="Submit"
        marginLeft="md"
        onClick={() => {
          socket.wager(wagerValue);
          setSubmittedWager(wagerValue);
        }}
      />
    </Flex>
  );
};
