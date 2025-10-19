import React from "react";

export const useStableCallback = <TArgs extends unknown[], TReturn>(
  callback: (...args: TArgs) => TReturn
): ((...args: TArgs) => TReturn) => {
  const funcRef = React.useRef(callback);
  funcRef.current = callback;
  return React.useCallback((...args: TArgs) => funcRef.current(...args), []);
};
