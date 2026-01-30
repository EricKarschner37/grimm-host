import {
  BOARD_MESSAGE_STRING,
  RESPONSE_MESSAGE_STRING,
  NEXT_ROUND_MESSAGE_STRING,
  RANDOMIZE_ACTIVE_PLAYER_MESSAGE_STRING,
} from "./page-board.constants";
import {
  makeRemoveMessage,
  makeRevealMessage,
  makeSetPlayerBalanceMessage,
} from "./page-board.utils";
import { isStateMessageShape } from "../common/types/game-state.type-guards";
import { GameState, StateMessage } from "../common/types/game-state.types";
import { getGameStateFromStateMessage } from "../common/types/get-game-state";
import { SocketWrapper, useSocket } from "../lib/utils/hooks/use-socket";
import { useStableCallback } from "../lib/utils/hooks/use-stable-callback";
import React from "react";

export interface UseBoardSocketArgs {
  lobbyId: string;
  setGameState: (value: GameState) => void;
}

export interface BoardSocketWrapper extends SocketWrapper {
  setPlayerBalance: (name: string, balance: number) => void;
  reveal: (row: number, col: number) => void;
  goToResponse: () => void;
  nextRound: () => void;
  showBoard: () => void;
  removePlayer: (player: string) => void;
  randomizeActivePlayer: () => void;
}

const deserializeBoardMessage = (message: string): StateMessage | null => {
  const obj = JSON.parse(message);
  if (isStateMessageShape(obj)) {
    return obj;
  }
  return null;
};

export const useBoardSocket = ({
  lobbyId,
  setGameState,
}: UseBoardSocketArgs): BoardSocketWrapper => {
  const socket = useSocket({
    path: `/api/ws/${lobbyId}/board`,
    onMessage: (e: MessageEvent) => {
      const message = deserializeBoardMessage(e.data);
      if (!message) {
        return;
      }

      if (message.message === "state") {
        setGameState(getGameStateFromStateMessage(message));
      }
    },
    enabled: Boolean(lobbyId),
  });

  const reveal = useStableCallback((row: number, col: number) => {
    socket.send(makeRevealMessage(row, col));
  });

  const setPlayerBalance = useStableCallback(
    (name: string, balance: number) => {
      socket.send(makeSetPlayerBalanceMessage(name, balance));
    }
  );

  const removePlayer = useStableCallback((player: string) => {
    socket.send(makeRemoveMessage(player));
  });

  const goToResponse = useStableCallback(() => {
    socket.send(RESPONSE_MESSAGE_STRING);
  });

  const nextRound = useStableCallback(() => {
    socket.send(NEXT_ROUND_MESSAGE_STRING);
  });

  const showBoard = useStableCallback(() => {
    socket.send(BOARD_MESSAGE_STRING);
  });

  const randomizeActivePlayer = useStableCallback(() => {
    socket.send(RANDOMIZE_ACTIVE_PLAYER_MESSAGE_STRING);
  });

  return React.useMemo(
    () => ({
      ...socket,
      reveal,
      setPlayerBalance,
      removePlayer,
      goToResponse,
      nextRound,
      showBoard,
      randomizeActivePlayer,
    }),
    [
      goToResponse,
      removePlayer,
      reveal,
      setPlayerBalance,
      showBoard,
      socket,
      nextRound,
      randomizeActivePlayer,
    ]
  );
};
