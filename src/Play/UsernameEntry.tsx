import { Button } from "../lib/Button/Button";
import { Flex } from "../lib/Flex";
import { Input } from "../lib/Input/Input";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const UsernameEntry = () => {
  const [username, setUsername] = React.useState("");

  const [, setSearchParams] = useSearchParams();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Flex marginBottom="md" direction="row" justify="space-evenly">
        <Input
          hint="Username"
          onChange={(value) => setUsername(value)}
          value={username}
        />
        <Button label="connect" onClick={() => setSearchParams({ username })} />
      </Flex>
    </form>
  );
};
