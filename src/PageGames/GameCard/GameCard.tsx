import * as React from "react";
import { Panel } from "lib/Panel/Panel";
import { Text } from "lib/Text";
import { getFormattedTimeSince } from "lib/utils/get-formatted-time-since";

import "./game-card.scss";
import { NavLink } from "react-router-dom";
import { classNames } from "lib/utils/classNames";
import { Flex } from "lib/Flex";
import { FlexItem } from "lib/FlexItem/FlexItem";
import { Input } from "lib/Input/Input";
import { Button } from "lib/Button/Button";

export interface GameCardProps {
  created: Date;
  lobbyId: string;
}

const BLOCK = "page-games__game-card";

export const GameCard = ({ created, lobbyId }: GameCardProps) => {
  const [username, setUsername] = React.useState("");
  return (
    <Panel
      isFullWidth
      isFullHeight
      className={classNames(`${BLOCK}__panel`, `${BLOCK}__container`)}
    >
      <Panel padding="sm" className={`${BLOCK}__panel--absolute`}>
        <Flex direction="column" isFullWidth isFullHeight>
          <Text text={lobbyId} margin="none" />
          <Text
            margin="none"
            variant="secondary"
            size="sm"
            text={`Created ${getFormattedTimeSince(created)}`}
          />
          <FlexItem grow />
          <form onSubmit={(e) => e.preventDefault()}>
            <Flex
              direction="row"
              justify="flex-end"
              className={`${BLOCK}__details`}
              gap="8px"
            >
              <Input hint="Username" value={username} onChange={setUsername} />
              <Button
                href={`/play/${lobbyId}?username=${username}`}
                label="Join"
                variant="primary"
                isEnabled={!!username}
              />
            </Flex>
          </form>
        </Flex>
      </Panel>
    </Panel>
  );
};
