import {
  BoardMessage,
  ResponseMessage,
  StartDoubleMessage,
  StartFinalMessage,
} from "PageBoard/page-board.types";

export const RESPONSE_MESSAGE: ResponseMessage = {
  request: "response",
};

export const RESPONSE_MESSAGE_STRING = JSON.stringify(RESPONSE_MESSAGE);

export const START_DOUBLE_MESSAGE: StartDoubleMessage = {
  request: "start_double",
};

export const START_DOUBLE_MESSAGE_STRING = JSON.stringify(START_DOUBLE_MESSAGE);

export const START_FINAL_MESSAGE: StartFinalMessage = {
  request: "start_final",
};

export const START_FINAL_MESSAGE_STRING = JSON.stringify(START_FINAL_MESSAGE);

export const BOARD_MESSAGE: BoardMessage = {
  request: "board",
};

export const BOARD_MESSAGE_STRING = JSON.stringify(BOARD_MESSAGE);
