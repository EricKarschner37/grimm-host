import {
  RemoveMessage,
  RevealMessage,
  SetPlayerBalanceMessage,
} from "PageBoard/page-board.types";

export const makeRevealMessage = (row: number, col: number): string => {
  const message: RevealMessage = {
    request: "reveal",
    row,
    col,
  };

  return JSON.stringify(message);
};

export const makeRemoveMessage = (player: string) => {
  const message: RemoveMessage = {
    request: "remove",
    player,
  };

  return JSON.stringify(message);
};

export const makeSetPlayerBalanceMessage = (player: string, amount: number) => {
  const message: SetPlayerBalanceMessage = {
    request: "set_player_balance",
    player,
    amount,
  };

  return JSON.stringify(message);
};
