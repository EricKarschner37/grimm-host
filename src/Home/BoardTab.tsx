import { Button } from "lib/Button/Button";
import { Input } from "lib/Input/Input";
import { Spacing } from "lib/Spacing/Spacing";
import React from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

export const BoardTab = () => {
  const [gameNumInput, setGameNumInput] = React.useState<string>("");

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
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        } else {
          throw new Error("Couldn't reach Jeopardy server");
        }
      })
      .then((obj) => {
        if ("gameIndex" in obj) {
          navigate(String(obj.gameIndex));
        }
      })
      .catch((reason) => console.log(reason));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Spacing margin="md">
        <Input
          onChange={handleGameNumInputChange}
          value={gameNumInput}
          hint="J! Archive Game ID"
        />
        <Button
          size="sm"
          label="Launch"
          marginLeft="sm"
          onClick={launchGameCallback}
        />
      </Spacing>
    </form>
  );
};
