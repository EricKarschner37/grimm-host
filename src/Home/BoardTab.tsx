import { Button } from "lib/Button/Button";
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
      .then((data) => data.json())
      .then((obj) => {
        console.log(obj.gameIndex);
        if ("gameIndex" in obj) {
          navigate(String(obj.gameIndex));
        }
      });
  };

  return (
    <>
      <input
        onChange={(e) => handleGameNumInputChange(e.target.value)}
        value={gameNumInput}
        placeholder="J! Archive Game ID"
      />
      <Button
        size="sm"
        label="Launch"
        marginLeft="sm"
        onClick={launchGameCallback}
      />
    </>
  );
};
