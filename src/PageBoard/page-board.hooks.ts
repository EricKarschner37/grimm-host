import { RevealMessage } from "PageBoard/page-board.types";
import { isStateMessageShape } from "common/types/game-state.type-guards";
import { GameState, StateMessage } from "common/types/game-state.types";
import { getGameStateFromStateMessage } from "common/types/get-game-state";
import { SocketWrapper, useSocket } from "lib/utils/hooks/use-socket";
import React from "react";

export interface UseBoardSocketArgs {
  gameIndex: string;
  setGameState: (value: GameState) => void;
}

export interface BoardSocketWrapper extends SocketWrapper {
  setPlayerBalance: (name: string, balance: number) => void;
  reveal: (row: number, col: number) => void;
}

const deserializeBoardMessage = (message: string): StateMessage | null => {
  const obj = JSON.parse(message);
  if (isStateMessageShape(obj)) {
    return obj;
  }
  return null;
};

const makeRevealMessage = (row: number, col: number): string => {
  const message: RevealMessage = {
    request: "reveal",
    row,
    col,
  };

  return JSON.stringify(message);
};

export const useBoardSocket = ({
  gameIndex,
  setGameState,
}: UseBoardSocketArgs) => {
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

  const reveal = React.useCallback(
    (row: number, col: number) => {
      socket.send(makeRevealMessage(row, col));
    },
    [socket]
  );

  const setPlayerBalance = React.useCallback(
    (name: string, balance: string) => {
      console.log("unimplimented: setPlayerBalance");
    },
    []
  );

  return React.useMemo(
    () => ({ ...socket, reveal, setPlayerBalance }),
    [reveal, setPlayerBalance, socket]
  );
};
