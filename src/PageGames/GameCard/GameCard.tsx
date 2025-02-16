import * as React from "react";
import pluralize from "pluralize";
import { Panel } from "lib/Panel/Panel";
import { Text } from "lib/Text";
import { getFormattedTimeSince } from "lib/utils/get-formatted-time-since";

import "./game-card.scss";
import { classNames } from "lib/utils/classNames";
import { Flex } from "lib/Flex";
import { FlexItem } from "lib/FlexItem/FlexItem";
import { Input } from "lib/Input/Input";
import { Button } from "lib/Button/Button";

export interface GameCardProps {
  created: Date;
  lobbyId: string;
  players?: string[];
}

const BLOCK = "page-games__game-card";

export const GameCard = ({ created, lobbyId, players }: GameCardProps) => {
  const [username, setUsername] = React.useState("");

  // We want to show 3 players, plus one line saying "and n others".
  // UNLESS there's only one other, in which case let's just show all four
  const numPlayersToShow = players?.length === 4 ? 4 : 3;
  return (
    <Panel
      isFullWidth
      isFullHeight
      className={classNames(`${BLOCK}__container`)}
    >
      <Panel tabIndex={0} padding="sm" className={`${BLOCK}__panel`}>
        <Flex direction="column" isFullWidth isFullHeight>
          <Text text={lobbyId} margin="none" />
          <Text
            margin="none"
            variant="secondary"
            size="sm"
            text={`Created ${getFormattedTimeSince(created)}`}
          />
          <FlexItem grow>
            <Text size="sm" variant="secondary" margin="none">
              <Text
                margin="none"
                textStyle="bold"
                size="sm"
                variant="secondary"
              >
                {pluralize("player", players?.length ?? 0, true)}
              </Text>
              <div className={`${BLOCK}__details`}>
                {players ? (
                  <>
                    <ul className={`${BLOCK}__player-list`}>
                      {players.slice(0, numPlayersToShow).map((player) => (
                        <li>{player}</li>
                      ))}
                    </ul>
                    {players.length > 4
                      ? `... and ${players.length - 3} others`
                      : null}
                  </>
                ) : (
                  "Be the first!"
                )}
              </div>
            </Text>
          </FlexItem>
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
