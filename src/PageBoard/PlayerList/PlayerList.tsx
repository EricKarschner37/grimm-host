import { BoardSocketWrapper } from "PageBoard/page-board.hooks";
import { Text } from "lib/Text";
import { GameState, Player } from "common/types/game-state.types";
import { Panel } from "lib/Panel/Panel";
import "./player-list.scss";
import React from "react";
import { PopoverButton } from "lib/PopoverButton/PopoverButton";
import { PencilIcon } from "lib/icons/PencilIcon";
import { XIcon } from "lib/icons/XIcon";
import { Input } from "lib/Input/Input";
import { Flex } from "lib/Flex";

const BLOCK = "page-board_player-list";

export const PlayerList = ({
  gameState,
  socket,
}: {
  gameState: GameState;
  socket: BoardSocketWrapper;
}) => {
  const sorted = React.useMemo(
    () =>
      Object.entries(gameState.players).sort(
        ([, { balance: a }], [, { balance: b }]) => b - a
      ),
    [gameState.players]
  );
  return (
    <div className={`${BLOCK}_container`}>
      {sorted.map(([name, player]) => (
        <>
          <PopoverButton
            onClick={() => socket.removePlayer(name)}
            variant="error"
            icon={XIcon}
          >
            <Text className={`${BLOCK}_name`} text={name} />
          </PopoverButton>
          <PlayerBalance player={player} socket={socket} />
        </>
      ))}
    </div>
  );
};

const validateNumberInProgress = (value: string) =>
  value === "-" || value === "" || !Number.isNaN(Number.parseInt(value));

const PlayerBalance = ({
  player,
  socket,
}: {
  player: Player;
  socket: BoardSocketWrapper;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [balanceText, setBalanceText] = React.useState(String(player.balance));

  if (isEditing) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const balance = Number.parseInt(balanceText);
          if (Number.isNaN(balance)) return;
          socket.setPlayerBalance(player.name, balance);
          setIsEditing(false);
        }}
      >
        <Flex isFullHeight direction="row" align="center">
          <Input
            className={`${BLOCK}_balance-input`}
            value={balanceText}
            onChange={(s) => validateNumberInProgress(s) && setBalanceText(s)}
          />
        </Flex>
      </form>
    );
  }
  return (
    <PopoverButton
      onClick={() => {
        setIsEditing(true);
        setBalanceText(String(player.balance));
      }}
      variant="default"
      icon={PencilIcon}
    >
      <Text text={`$${player.balance}`} />
    </PopoverButton>
  );
};
