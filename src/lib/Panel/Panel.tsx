import * as React from "react";
import "./panel.scss";
import { LayoutProps, MarginProps, PaddingProps } from "lib/types";
import { classNames, getHelperClassNames } from "lib/utils/classNames";

const BLOCK = "lib_panel";

export type PanelProps = React.PropsWithChildren<
  MarginProps &
    PaddingProps &
    LayoutProps & {
      mode?: "light" | "dark";
      className?: string;
      tabIndex?: number;
    }
>;

export const Panel = ({
  children,
  mode = "light",
  className,
  tabIndex,
  ...rest
}: PanelProps) => {
  const helperClassNames = getHelperClassNames(rest);
  return (
    <div
      tabIndex={tabIndex}
      className={classNames(
        ...helperClassNames,
        `${BLOCK}_container`,
        `${BLOCK}_container--${mode}`,
        className
      )}
    >
      {children}
    </div>
  );
};
