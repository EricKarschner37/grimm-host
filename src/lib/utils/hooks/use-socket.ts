import { useInterval } from "./use-interval";
import { useStableCallback } from "./use-stable-callback";
import { useTimeout } from "./use-timeout";
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

export type ReadyState = 
    | WebSocket["CONNECTING"]
    | WebSocket["OPEN"]
    | WebSocket["CLOSING"]
    | WebSocket["CLOSED"];

export interface SocketWrapper {
  send: (message: string) => void;
  close: () => void;
  readyState: ReadyState;
  retry: () => void;
}

const BASE_URL = process.env.REACT_APP_WS_URL;

const BASE_RETRY_TIMEOUT = 1000;

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

  const [readyState, setReadyState] = React.useState<ReadyState>(innerEnabled ? WebSocket.CONNECTING : WebSocket.CLOSED);
  const [retriesCount, setRetriesCount] = React.useState(0);

  React.useEffect(() => {
    return () => socketRef.current?.close();
  }, []);

  const refreshReadyState = useStableCallback(() => {
	const readyState = getReadyState(socketRef.current?.readyState, innerEnabled)
	setReadyState(readyState);
  });

  useInterval(refreshReadyState, 5000);

  const retry = useStableCallback(() => {
	  setRetriesCount(prev => prev + 1);
  })
  useTimeout(retry, BASE_RETRY_TIMEOUT * 2**retriesCount, {enabled: readyState === WebSocket.CLOSED && !userHasClosed});

  const send = useStableCallback((message: string) => {
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
    });

	const close = useStableCallback(() => {
      socketRef.current?.close();
      setUserHasClosed(true);
    });
  
  React.useEffect(() => {
    if (!innerEnabled) {
	  setReadyState(WebSocket.CLOSED);
      return;
    }
    const newSocket = new WebSocket(`${BASE_URL}${path}`);
    newSocket.onopen = (e) => {
      messageQueueRef.current.forEach((message) => newSocket.send(message));
      messageQueueRef.current = [];
      if (DEBUG) {
        console.debug("use-socket: onopen: ", e);
      }
      if (onOpen) {
        onOpen(e);
      }
	  setReadyState(getReadyState(newSocket.readyState, innerEnabled));
	  setRetriesCount(0);
    };

    newSocket.onclose = (e) => {
      if (DEBUG) {
        console.debug("use-socket: onclose: ", e);
      }
      if (onClose) {
        onClose(e);
      }
	  setReadyState(getReadyState(newSocket.readyState, innerEnabled));
    };

    newSocket.onerror = (e) => {
      if (DEBUG) {
        console.debug("use-socket: onerror: ", e);
      }
      if (onError) {
        onError(e);
      }
	  setReadyState(getReadyState(newSocket.readyState, innerEnabled));
    };

    newSocket.onmessage = (e) => {
      if (DEBUG) {
        console.debug("use-socket: onmessage: ", e);
      }
      if (onMessage) {
        onMessage(e);
      }
	  setReadyState(getReadyState(newSocket.readyState, innerEnabled));
    };

    socketRef.current = newSocket;
	setReadyState(getReadyState(newSocket.readyState, innerEnabled));
    // We don't want a new socket every time one of these event handlers changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, retriesCount]);


  return React.useMemo<SocketWrapper>(() => {
    return {
      send,
      close,
      readyState,
	  retry,
    } satisfies SocketWrapper;
  }, [innerEnabled, send, close, readyState, retry]);
};

function getReadyState(socketReadyState: number | undefined, innerEnabled: boolean): ReadyState {
	return match(socketReadyState)
    	.with(WebSocket.CONNECTING, () => WebSocket.CONNECTING)
    	.with(WebSocket.OPEN, () => WebSocket.OPEN)
    	.with(WebSocket.CLOSING, () => WebSocket.CLOSING)
    	.with(WebSocket.CLOSED, () => WebSocket.CLOSED)
    	.otherwise(() =>
    	  innerEnabled ? WebSocket.CONNECTING : WebSocket.CLOSED
    	)
}
