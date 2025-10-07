export interface ReportPlayerCorrectMessage {
  request: "correct";
  correct: boolean;
}

export interface OpenBuzzersMessage {
  request: "open";
}

export interface CloseBuzzersMessage {
  request: "close";
}

export interface ChoosePlayerMessage {
  request: "player";
  player: string;
}

export interface ForceContinueMessage {
  request: "continue";
}
