import React from "react";

export const useStableCallback = <TFunc extends (...args: any) => any>(
  callback: TFunc
): TFunc => {
  const funcRef = React.useRef(callback);
  funcRef.current = callback;
  return callback;
};
