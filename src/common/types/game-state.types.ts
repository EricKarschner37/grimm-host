export type Player = {
  name: string;
  balance: number;
};

interface BareCategory {
  category: string;
  clue_costs: number[];
}

interface BareDefaultRound {
  round_type: "DefaultRound";
  name: string;
  categories: BareCategory[];
  default_max_wager: number;
}

interface BareFinalRound {
  round_type: "FinalRound";
  name: string;
  category: string;
  default_max_wager: number;
}

type BareRound = BareDefaultRound | BareFinalRound;

export interface GameState {
  type:
    | "response"
    | "clue"
    | "board"
    | "daily-double"
    | "final-wager"
    | "final-clue";
  buzzersOpen: boolean;
  buzzedPlayer: string;
  activePlayer: string;
  respondedPlayers: string[];
  cost: number;
  category: string;
  clue: string;
  response: string;
  players: Record<string, Player>;
  cluesShown: number;
  bareRound: BareRound;
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
  buzzers_open: boolean;
  buzzed_player: string;
  active_player: string;
  responded_players: string[];
  cost: number;
  category: string;
  clue: string;
  response: string;
  players: Record<string, { name: string; balance: number }>;
  round_idx: number;
  clues_shown: number;
  bare_round: BareRound;
}
