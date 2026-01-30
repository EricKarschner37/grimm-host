import { PlayerSocketWrapper } from "../play.hooks";
import { GameState } from "../../common/types/game-state.types";
import { Button } from "../../lib/Button/Button";
import { Input } from "../../lib/Input/Input";
import { Text } from "../../lib/Text";
import React from "react";

const validate = (value: string) => {
  return value !== "";
};

export const Response = ({
  socket,
  gameState,
}: {
  socket: PlayerSocketWrapper;
  gameState: GameState;
}) => {
  const [response, setResponse] = React.useState("");
  const [submittedResponse, setSubmittedResponse] = React.useState<
    string | undefined
  >(undefined);

  if (submittedResponse !== undefined) {
    return (
      <span>
        <Text isInline text={`Your response: ${submittedResponse}`} />
        <Button
          marginLeft="md"
          onClick={() => setSubmittedResponse(undefined)}
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
      <Input hint="Response" value={response} onChange={setResponse} />
      <Button
        label="Submit"
        marginLeft="md"
        onClick={() => {
          if (!validate(response)) return;
          socket.response(response);
          setSubmittedResponse(response);
        }}
      />
    </form>
  );
};
