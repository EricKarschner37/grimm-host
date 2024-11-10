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
    }
>;

export const Panel = ({
  children,
  mode = "light",
  className,
  ...rest
}: PanelProps) => {
  const helperClassNames = getHelperClassNames(rest);
  return (
    <div
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
