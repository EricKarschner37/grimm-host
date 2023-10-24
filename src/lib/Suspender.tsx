import * as React from "react";

export interface SuspenderProps<P, PGuarded> {
  shouldRender: (props: P | PGuarded) => props is PGuarded;
  renderEmpty: React.FunctionComponent<P>;
  render: React.FunctionComponent<PGuarded>;
  props: P | PGuarded;
}
export const Suspender = <P, PGuarded>({
  shouldRender,
  render,
  renderEmpty,
  props,
}: SuspenderProps<P, PGuarded>) => {
  if (shouldRender(props)) {
    return render(props);
  } else {
    return renderEmpty(props);
  }
};
