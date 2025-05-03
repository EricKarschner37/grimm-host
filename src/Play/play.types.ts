import { StateMessage } from "common/types/game-state.types";

export interface CategoryMessage {
  message: "categories";
  categories: [string, string, string, string, string, string];
}

export type PlayerMessageRx = CategoryMessage | StateMessage;

export interface RegisterMessage {
  request: "register";
  name: string;
}

export interface BuzzMessage {
  request: "buzz";
}

export interface ReportRespondedMessage {
	request: "responded";
}

export interface WagerMessage {
  request: "wager";
  amount: number;
}

export interface PlayerResponseMessage {
  request: "response";
  response: string;
}

export type PlayerMessageTx = RegisterMessage;
