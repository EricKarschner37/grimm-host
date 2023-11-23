import {
  BOARD_MESSAGE_STRING,
  RESPONSE_MESSAGE_STRING,
  START_DOUBLE_MESSAGE_STRING,
  START_FINAL_MESSAGE_STRING,
} from "PageBoard/page-board.constants";
import {
  makeRemoveMessage,
  makeRevealMessage,
  makeSetPlayerBalanceMessage,
} from "PageBoard/page-board.utils";
import { isStateMessageShape } from "common/types/game-state.type-guards";
import { GameState, StateMessage } from "common/types/game-state.types";
import { getGameStateFromStateMessage } from "common/types/get-game-state";
import { SocketWrapper, useSocket } from "lib/utils/hooks/use-socket";
import { useStableCallback } from "lib/utils/hooks/use-stable-callback";
import React from "react";

export interface UseBoardSocketArgs {
  gameIndex: string;
  setGameState: (value: GameState) => void;
}

export interface BoardSocketWrapper extends SocketWrapper {
  setPlayerBalance: (name: string, balance: number) => void;
  reveal: (row: number, col: number) => void;
  goToResponse: () => void;
  startDouble: () => void;
  startFinal: () => void;
  showBoard: () => void;
  removePlayer: (player: string) => void;
}

const deserializeBoardMessage = (message: string): StateMessage | null => {
  const obj = JSON.parse(message);
  if (isStateMessageShape(obj)) {
    return obj;
  }
  return null;
};

export const useBoardSocket = ({
  gameIndex,
  setGameState,
}: UseBoardSocketArgs): BoardSocketWrapper => {
  const socket = useSocket({
    path: `/api/ws/${gameIndex}/board`,
    onMessage: (e: MessageEvent) => {
      const message = deserializeBoardMessage(e.data);
      if (!message) {
        return;
      }

      if (message.message === "state") {
        setGameState(getGameStateFromStateMessage(message));
      }
    },
    enabled: Boolean(gameIndex),
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

  const startDouble = useStableCallback(() => {
    socket.send(START_DOUBLE_MESSAGE_STRING);
  });

  const startFinal = useStableCallback(() => {
    socket.send(START_FINAL_MESSAGE_STRING);
  });

  const showBoard = useStableCallback(() => {
    socket.send(BOARD_MESSAGE_STRING);
  });

  return React.useMemo(
    () => ({
      ...socket,
      reveal,
      setPlayerBalance,
      removePlayer,
      goToResponse,
      startDouble,
      startFinal,
      showBoard,
    }),
    [
      goToResponse,
      removePlayer,
      reveal,
      setPlayerBalance,
      showBoard,
      socket,
      startDouble,
      startFinal,
    ]
  );
};
