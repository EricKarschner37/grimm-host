import { GameState, StateMessage } from "./game-state.types";
import { match } from "ts-pattern";

export const getGameStateFromStateMessage = (
  payload: StateMessage
): GameState => ({
  type: match<StateMessage["state_type"], GameState["type"]>(payload.state_type)
    .with("Response", () => "response")
    .with("Clue", () => "clue")
    .with("Board", () => "board")
    .with("DailyDouble", () => "daily-double")
    .with("FinalClue", () => "final-clue")
    .with("FinalWager", () => "final-wager")
    .exhaustive(),
  players: payload.players,
  bareRound: payload.bare_round,
  cost: payload.cost,
  category: payload.category,
  clue: payload.clue,
  mediaUrl: payload.media_url,
  response: payload.response,
  buzzersOpen: payload.buzzers_open,
  buzzedPlayer: payload.buzzed_player,
  respondedPlayers: payload.responded_players,
  activePlayer: payload.active_player,
  cluesShown: payload.clues_shown,
});
