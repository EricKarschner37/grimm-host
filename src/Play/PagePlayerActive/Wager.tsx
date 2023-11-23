import { PlayerSocketWrapper } from "Play/play.hooks";
import { GameState } from "common/types/game-state.types";
import { Button } from "lib/Button/Button";
import { Input } from "lib/Input/Input";
import { Text } from "lib/Text";
import React from "react";

const validate = (value: string) => {
  return value === "-" || !Number.isNaN(Number.parseInt(value));
};

export const Wager = ({
  socket,
  gameState,
}: {
  socket: PlayerSocketWrapper;
  gameState: GameState;
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
        onChange={(value) => validate(value) && setWagerText(value)}
      />
      <Button
        label="Submit"
        marginLeft="md"
        onClick={() => {
          const wager = Number.parseInt(wagerText);
          if (isNaN(wager)) return;
          socket.wager(wager);
          setSubmittedWager(wager);
        }}
      />
    </form>
  );
};
