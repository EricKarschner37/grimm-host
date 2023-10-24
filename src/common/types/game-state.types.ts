export type Player = {
  name: string;
  balance: number;
};

//export interface BaseGameState {
//  categories: [string, string, string, string, string, string];
//  players: Record<string, Player>;
//  round: "single" | "double" | "final";
//}
//
//export interface BoardState extends BaseGameState {
//  type: "board";
//  cluesShown: number;
//}
//
//export interface ClueState extends BaseGameState {
//  type: "clue";
//  cost: number;
//  category: string;
//  clue: string;
//  buzzersOpen: boolean;
//  buzzedPlayer: string;
//  respondedPlayers: string[];
//}
//
//export interface ResponseState extends BaseGameState {
//  type: "response";
//  cost: number;
//  category: string;
//  clue: string;
//  response: string;
//}
//
//export interface DailyDoubleState extends BaseGameState {
//  type: "daily-double";
//  category: string;
//  activePlayer: string;
//}
//
//export interface FinalWagerState extends BaseGameState {
//  type: "final-wager";
//  category: string;
//}
//
//export interface FinalClueState extends BaseGameState {
//  type: "final-clue";
//  category: string;
//  clue: string;
//}

//export type GameState =
//  | BoardState
//  | ResponseState
//  | ClueState
//  | DailyDoubleState
//  | FinalWagerState
//  | FinalClueState;

export interface GameState {
  type:
    | "response"
    | "clue"
    | "board"
    | "daily-double"
    | "final-wager"
    | "final-clue";
  categories: [string, string, string, string, string, string];
  buzzersOpen: boolean;
  buzzedPlayer: string;
  activePlayer: string;
  respondedPlayers: string[];
  cost: number;
  category: string;
  clue: string;
  response: string;
  players: Record<string, Player>;
  round: "single" | "double" | "final";
  cluesShown: number;
}

export interface StateMessage {
  message: "state";
  state_type:
    | "Response"
    | "Clue"
    | "Board"
    | "DailyDouble"
    | "FinalWager"
    | "FinalClue";
  categories: [string, string, string, string, string, string];
  buzzers_open: boolean;
  buzzed_player: string;
  active_player: string;
  responded_players: string[];
  cost: number;
  category: string;
  clue: string;
  response: string;
  players: Record<string, { name: string; balance: number }>;
  round: "Single" | "Double" | "Final";
  clues_shown: number;
}
