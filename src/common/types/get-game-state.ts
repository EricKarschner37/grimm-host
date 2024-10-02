import { GameState, StateMessage } from "common/types/game-state.types";
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
  categories: payload.categories,
  players: payload.players,
  round: match<StateMessage["round_idx"], GameState["round"]>(payload.round_idx)
    .with(1, () => "double")
    .with(2, () => "final")
    .otherwise(() => "single"),
  cost: payload.cost,
  category: payload.category,
  clue: payload.clue,
  response: payload.response,
  buzzersOpen: payload.buzzers_open,
  buzzedPlayer: payload.buzzed_player,
  respondedPlayers: payload.responded_players,
  activePlayer: payload.active_player,
  cluesShown: payload.clues_shown,
});

//export const getGameStateFromStateMessage = (
//  payload: StateMessage
//): GameState => {
//  const commonState = {
//    categories: payload.categories,
//    players: payload.players,
//    round: match<StateMessage["round"], GameState["round"]>(payload.round)
//      .with("Single", () => "single")
//      .with("Double", () => "double")
//      .with("Final", () => "final")
//      .exhaustive(),
//  } as const;
//
//  if (payload.state_type === "Response") {
//    return {
//      ...commonState,
//      type: "response",
//      cost: payload.cost,
//      category: payload.category,
//      clue: payload.clue,
//      response: payload.response,
//    };
//  }
//
//  if (payload.state_type === "Clue") {
//    return {
//      ...commonState,
//      type: "clue",
//      cost: payload.cost,
//      category: payload.category,
//      clue: payload.clue,
//      buzzersOpen: payload.buzzers_open,
//      buzzedPlayer: payload.buzzed_player,
//      respondedPlayers: payload.responded_players,
//    };
//  }
//
//  if (payload.state_type === "Board") {
//    return {
//      ...commonState,
//      type: "board",
//      cluesShown: payload.clues_shown,
//    };
//  }
//
//  if (payload.state_type === "DailyDouble") {
//    return {
//      ...commonState,
//      type: "daily-double",
//      category: payload.category,
//      activePlayer: payload.active_player,
//    };
//  }
//
//  if (payload.state_type === "FinalWager") {
//    return {
//      ...commonState,
//      type: "final-wager",
//      category: payload.category,
//    };
//  }
//
//  return {
//    ...commonState,
//    type: "final-clue",
//    category: payload.category,
//    clue: payload.clue,
//  };
//};
