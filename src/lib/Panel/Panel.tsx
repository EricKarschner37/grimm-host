import * as React from "react";
import "./panel.scss";
import { MarginProps, PaddingProps } from "lib/types";
import { classNames, getHelperClassNames } from "lib/utils/classNames";

const BLOCK = "lib_panel";

export type PanelProps = React.PropsWithChildren<MarginProps & PaddingProps>;

export const Panel = ({ children, ...rest }: PanelProps) => {
  const helperClassNames = getHelperClassNames(rest);
  return (
    <div className={classNames([`${BLOCK}_container`, ...helperClassNames])}>
      {children}
    </div>
  );
};
