export interface RevealMessage {
  request: "reveal";
  row: number;
  col: number;
}

export interface ResponseMessage {
  request: "response";
}

export interface StartDoubleMessage {
  request: "start_double";
}

export interface StartFinalMessage {
  request: "start_final";
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
