import React from "react";
import { match } from "ts-pattern";

const DEBUG = process.env.REACT_APP_DEBUG === "true";

export interface UseSocketProps {
  path: string;
  onOpen?: (event: Event) => void;
  onClose?: (event: CloseEvent) => void;
  onError?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  enabled?: boolean;
}

export interface SocketWrapper {
  send: (message: string) => void;
  close: () => void;
  readyState:
    | WebSocket["CONNECTING"]
    | WebSocket["OPEN"]
    | WebSocket["CLOSING"]
    | WebSocket["CLOSED"];
}

const BASE_URL = process.env.REACT_APP_WS_URL;

export const useSocket = ({
  path,
  onOpen,
  onClose,
  onError,
  onMessage,
  enabled = true,
}: UseSocketProps) => {
  const socketRef = React.useRef<WebSocket>();
  const messageQueueRef = React.useRef<string[]>([]);
  const [userHasClosed, setUserHasClosed] = React.useState(false);

  const innerEnabled = React.useMemo(
    () => !userHasClosed && enabled,
    [enabled, userHasClosed]
  );

  React.useEffect(() => {
    return () => socketRef.current?.close();
  }, []);

  React.useEffect(() => {
    if (!innerEnabled) {
      return;
    }
    console.trace();
    const newSocket = new WebSocket(`${BASE_URL}${path}`);
    newSocket.onopen = (e) => {
      messageQueueRef.current.forEach((message) => newSocket.send(message));
      messageQueueRef.current = [];
      if (DEBUG) {
        console.debug("use-socket: onopen: ", e);
      }
      onOpen?.(e);
    };
    newSocket.onclose = (e) => {
      if (DEBUG) {
        console.debug("use-socket: onclose: ", e);
      }
      if (onClose) {
        onClose?.(e);
      }
    };
    newSocket.onerror = (e) => {
      if (DEBUG) {
        console.debug("use-socket: onerror: ", e);
      }
      if (onError) {
        newSocket.onerror = onError;
      }
    };
    newSocket.onmessage = (e) => {
      if (DEBUG) {
        console.debug("use-socket: onmessage: ", e);
      }
      if (onMessage) {
        newSocket.onmessage = onMessage;
      }
    };

    socketRef.current = newSocket;
    // We don't want a new socket every time one of these event handlers changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return React.useMemo<SocketWrapper>(() => {
    const send = (message: string) => {
      if (
        !socketRef.current ||
        socketRef.current.readyState !== WebSocket.OPEN
      ) {
        messageQueueRef.current.push(message);
        console.log("queueing message: ", message);
      } else {
        socketRef.current.send(message);
        console.log("sending message: ", message);
      }
    };

    const close = () => {
      socketRef.current?.close();
      setUserHasClosed(true);
    };

    const readyState = socketRef.current
      ? match(socketRef.current.readyState)
          .with(WebSocket.CONNECTING, () => WebSocket.CONNECTING)
          .with(WebSocket.OPEN, () => WebSocket.OPEN)
          .with(WebSocket.CLOSING, () => WebSocket.CLOSING)
          .with(WebSocket.CLOSED, () => WebSocket.CLOSED)
          .otherwise(() =>
            innerEnabled ? WebSocket.CONNECTING : WebSocket.CLOSED
          )
      : innerEnabled
      ? WebSocket.CONNECTING
      : WebSocket.CLOSED;

    return {
      send,
      close,
      readyState,
    } satisfies SocketWrapper;
  }, [innerEnabled]);
};
