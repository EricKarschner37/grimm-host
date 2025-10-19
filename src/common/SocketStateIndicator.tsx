import * as React from 'react';
import { LoadingIndicator } from "lib/LoadingIndicator/LoadingIndicator";
import { type ReadyState } from "lib/utils/hooks/use-socket";
import { AlertIcon } from "lib/icons/AlertIcon";
import { ConnectedIcon } from "lib/icons/ConnectedIcon";
import { match } from 'ts-pattern';

export const SocketStateIndicator: React.FunctionComponent<{readyState: ReadyState}> = ({readyState}) => {
	return match(readyState)
			  .with(WebSocket.CONNECTING, () => <LoadingIndicator />)
			  .with(WebSocket.CLOSED, () => AlertIcon)
			  .with(WebSocket.OPEN, () => ConnectedIcon)
			  .with(WebSocket.CLOSING, () => null)
			  .exhaustive()
}
