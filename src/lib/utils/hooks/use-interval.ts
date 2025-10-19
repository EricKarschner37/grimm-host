import * as React from "react";

/**
 * React hook wrapper for the `setInterval` builtin
 * `fn`: must be stable (timeout is cleared on id change)
 */
export const useInterval = (fn: Function, timeout: number, {enabled = true}: {enabled?: boolean} = {}) => {
	const idRef = React.useRef<number | null>(null);
	React.useEffect(() => {
		if (idRef.current) {
			clearInterval(idRef.current);
		}
		if (enabled) {
			idRef.current = setInterval(fn, timeout);
		}
	}, [fn, enabled]);
};
