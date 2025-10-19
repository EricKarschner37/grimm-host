import * as React from "react";

/**
 * React hook wrapper for the `setTimeout` builtin
 * `fn`: must be stable (timeout is cleared on id change)
 */
export const useTimeout = (fn: Function, timeout: number, {enabled = true}: {enabled?: boolean} = {}) => {
	const idRef = React.useRef<number | null>(null);
	React.useEffect(() => {
		if (idRef.current) {
			clearTimeout(idRef.current);
		}
		if (enabled) {
			idRef.current = setTimeout(fn, timeout);
		}
	}, [fn, enabled, timeout]);
};
