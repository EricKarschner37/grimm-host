import { BuzzMessage, PlayerMessageRx, RegisterMessage } from "Play/play.types";
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
  gameIndex: number;
  setGameState: React.Dispatch<React.SetStateAction<GameState | null>>;
}

export interface PlayerSocketWrapper extends SocketWrapper {
  buzz: () => void;
}

const deserializePlayerMessage = (message: string): PlayerMessageRx | null => {
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

export const usePlayerSocket = ({
  username,
  gameIndex,
  setGameState,
}: UsePlayerSocketProps) => {
  const socket = useSocket({
    path: `/api/ws/${gameIndex}/buzzer`,
    onMessage: (e: MessageEvent) => {
      console.log(e);
      const message = deserializePlayerMessage(e.data);
      if (!message) {
        return;
      }

      if (message.message === "state") {
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

  return React.useMemo(() => ({ ...socket, buzz }), [socket, buzz]);
};
