import { PlayerSocketWrapper } from "Play/play.hooks";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Input } from "lib/Input/Input";
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
  const [wagerText, setWagerText] = React.useState("");
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Input
        hint="Wager"
        value={wagerText}
        onChange={(value) => validateInProgress(value) && setWagerText(value)}
      />
      <Button
        label="Submit"
        marginLeft="md"
        onClick={() => {
          const wager = Number.parseInt(wagerText);
          if (!validateWager(wager, gameState, balance)) return;
          socket.wager(wager);
          setSubmittedWager(wager);
        }}
      />
    </form>
  );
};
