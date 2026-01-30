import {
  BoardMessage,
  NextRoundMessage,
  RandomizeActivePlayerMessage,
  ResponseMessage,
} from "./page-board.types";

export const RESPONSE_MESSAGE: ResponseMessage = {
  request: "response",
};

export const RESPONSE_MESSAGE_STRING = JSON.stringify(RESPONSE_MESSAGE);

export const NEXT_ROUND_MESSAGE: NextRoundMessage = {
  request: "next_round",
};

export const NEXT_ROUND_MESSAGE_STRING = JSON.stringify(NEXT_ROUND_MESSAGE);

export const BOARD_MESSAGE: BoardMessage = {
  request: "board",
};

export const BOARD_MESSAGE_STRING = JSON.stringify(BOARD_MESSAGE);

export const RANDOMIZE_ACTIVE_PLAYER_MESSAGE: RandomizeActivePlayerMessage = {
  request: "randomize_active_player",
};

export const RANDOMIZE_ACTIVE_PLAYER_MESSAGE_STRING = JSON.stringify(
  RANDOMIZE_ACTIVE_PLAYER_MESSAGE
);
