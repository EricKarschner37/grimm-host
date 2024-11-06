import {
  BuzzMessage,
  PlayerMessageRx,
  PlayerResponseMessage,
  RegisterMessage,
  WagerMessage,
} from "Play/play.types";
import { SocketWrapper, useSocket } from "lib/utils/hooks/use-socket";
import { GameState } from "common/types/game-state.types";
import React from "react";
import { getGameStateFromStateMessage } from "common/types/get-game-state";
import {
  isCategoriesMessageShape,
  isStateMessageShape,
} from "common/types/game-state.type-guards";

export interface UsePlayerSocketProps {
  username: string;
  lobbyId: string;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
}

export interface PlayerSocketWrapper extends SocketWrapper {
  buzz: () => void;
  wager: (value: number) => void;
  response: (value: string) => void;
}

export const deserializeMessage = (message: string): PlayerMessageRx | null => {
  const obj = JSON.parse(message);
  if (isCategoriesMessageShape(obj) || isStateMessageShape(obj)) {
    return obj;
  }

  return null;
};

const BUZZ_MESSAGE: BuzzMessage = {
  request: "buzz",
};

const BUZZ_MESSAGE_STRING: string = JSON.stringify(BUZZ_MESSAGE);

const makeWagerMessage = (wager: number) => {
  const message: WagerMessage = {
    request: "wager",
    amount: wager,
  };
  return JSON.stringify(message);
};

const makePlayerResponseMessage = (response: string) => {
  const message: PlayerResponseMessage = {
    request: "response",
    response,
  };
  return JSON.stringify(message);
};

export const usePlayerSocket = ({
  username,
  lobbyId,
  setGameState,
}: UsePlayerSocketProps): PlayerSocketWrapper => {
  const socket = useSocket({
    path: `/api/ws/${lobbyId}/buzzer`,
    onMessage: (e: MessageEvent) => {
      console.log("message in usePlayerSocket");
      const message = deserializeMessage(e.data);
      if (!message) {
        return;
      }

      if (message.message === "state") {
        console.log("state message");
        setGameState(getGameStateFromStateMessage(message));
      }
    },
  });

  React.useEffect(() => {
    const registerMessage: RegisterMessage = {
      request: "register",
      name: username,
    };
    socket.send(JSON.stringify(registerMessage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const buzz = React.useCallback(
    () => socket.send(BUZZ_MESSAGE_STRING),
    [socket]
  );

  const wager = React.useCallback(
    (value: number) => socket.send(makeWagerMessage(value)),
    [socket]
  );

  const response = React.useCallback(
    (value: string) => socket.send(makePlayerResponseMessage(value)),
    [socket]
  );

  return React.useMemo(
    () => ({ ...socket, buzz, wager, response }),
    [socket, buzz, wager, response]
  );
};
