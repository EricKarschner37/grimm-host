import { Button } from "lib/Button/Button";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const UsernameEntry = () => {
  const [username, setUsername] = React.useState("");

  const [, setSearchParams] = useSearchParams();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input onChange={(e) => setUsername(e.target.value)} value={username} />
      <Button label="connect" onClick={() => setSearchParams({ username })} />
    </form>
  );
};
