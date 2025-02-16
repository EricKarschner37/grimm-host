import { GameCard } from "PageGames/GameCard/GameCard";
import { Flex } from "lib/Flex";
import { Input } from "lib/Input/Input";
import { Panel } from "lib/Panel/Panel";
import { Text } from "lib/Text";
import { useGetGames } from "lib/utils/hooks/use-get-games";
import React from "react";

import "./page-games.scss";
import { Group } from "lib/Group/Group";
import { Button } from "lib/Button/Button";

const BLOCK = "page-games";

export const PageGames = () => {
  const { data: games } = useGetGames();
  const sortedGames = games?.sort(
    ({ created: a }, { created: b }) => b.getTime() - a.getTime()
  );

  const [lobbyId, setLobbyId] = React.useState("");

  return (
    <div className={`${BLOCK}__container`}>
      <Panel padding="md" mode="dark" className={`${BLOCK}__container-panel`}>
        <Flex
          direction="column"
          isFullWidth
          isFullHeight
          align="center"
          gap="4px"
        >
          <Text variant="title" text="Join Game" />
          <Group>
            <Input
              hint="Enter lobby id"
              value={lobbyId}
              onChange={setLobbyId}
            />
            <Button label="Join" />
          </Group>
          <Text text="Public Games" />
          <div className={`${BLOCK}__game-cards-grid`}>
            {sortedGames?.map(({ created, lobbyId, players }) => (
              <GameCard
                key={lobbyId}
                lobbyId={lobbyId}
                players={players}
                created={created}
              />
            ))}
          </div>
        </Flex>
      </Panel>
    </div>
  );
};
