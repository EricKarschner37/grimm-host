import {
  ChoosePlayerMessage,
  CloseBuzzersMessage,
  OpenBuzzersMessage,
  ReportPlayerCorrectMessage,
} from "PageHost/page-host.types";
import { deserializeMessage } from "Play/play.hooks";
import { GameState } from "common/types/game-state.types";
import { getGameStateFromStateMessage } from "common/types/get-game-state";
import { SocketWrapper, useSocket } from "lib/utils/hooks/use-socket";
import React from "react";

export interface UseHostSocketProps {
  gameIndex: number;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
}

export interface HostSocketWrapper extends SocketWrapper {
  reportPlayerCorrect: (correct: boolean) => void;
  choosePlayer: (player: string) => void;
  openBuzzers: () => void;
  closeBuzzers: () => void;
}

const makePlayerCorrectMessage = (correct: boolean): string => {
  const message: ReportPlayerCorrectMessage = {
    request: "correct",
    correct,
  };

  return JSON.stringify(message);
};

const makeChoosePlayerMessage = (player: string): string => {
  const message: ChoosePlayerMessage = {
    request: "player",
    player,
  };

  return JSON.stringify(message);
};

const OPEN_MESSAGE: OpenBuzzersMessage = {
  request: "open",
};

const OPEN_MESSAGE_STRING = JSON.stringify(OPEN_MESSAGE);

const CLOSE_MESSAGE: CloseBuzzersMessage = {
  request: "close",
};

const CLOSE_MESSAGE_STRING = JSON.stringify(CLOSE_MESSAGE);

export const useHostSocket = ({
  gameIndex,
  setGameState,
}: UseHostSocketProps): HostSocketWrapper => {
  const socket = useSocket({
    path: `/api/ws/${gameIndex}/host`,
    onMessage: (e: MessageEvent) => {
      const message = deserializeMessage(e.data);
      if (!message) {
        return;
      }

      if (message.message === "state") {
        setGameState(getGameStateFromStateMessage(message));
      }
    },
    enabled: !Number.isNaN(gameIndex),
  });

  const reportPlayerCorrect = React.useCallback(
    (correct: boolean) => {
      socket.send(makePlayerCorrectMessage(correct));
    },
    [socket]
  );

  const openBuzzers = React.useCallback(
    () => socket.send(OPEN_MESSAGE_STRING),
    [socket]
  );

  const closeBuzzers = React.useCallback(
    () => socket.send(CLOSE_MESSAGE_STRING),
    [socket]
  );

  const choosePlayer = React.useCallback(
    (player: string) => {
      socket.send(makeChoosePlayerMessage(player));
    },
    [socket]
  );

  return React.useMemo(
    () => ({
      ...socket,
      reportPlayerCorrect,
      openBuzzers,
      closeBuzzers,
      choosePlayer,
    }),
    [socket, reportPlayerCorrect, openBuzzers, closeBuzzers, choosePlayer]
  );
};
