export interface RevealMessage {
  request: "reveal";
  row: number;
  col: number;
}

export interface ResponseMessage {
  request: "response";
}

export interface NextRoundMessage {
  request: "next_round";
}

export interface BoardMessage {
  request: "board";
}

export interface RemoveMessage {
  request: "remove";
  player: string;
}

export interface SetPlayerBalanceMessage {
  request: "set_player_balance";
  player: string;
  amount: number;
}
