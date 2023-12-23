import { MarginProps, PaddingProps } from "lib/types";
import { classNames, getHelperClassNames } from "lib/utils/classNames";
import * as React from "react";
import "./spacing.scss";

export type SpacingProps = React.PropsWithChildren<MarginProps & PaddingProps>;

const BLOCK = "lib_spacing";

export const Spacing = React.forwardRef<HTMLDivElement, SpacingProps>(
  ({ children, ...rest }, ref) => {
    const helperClassNames = getHelperClassNames(rest);
    return (
      <div className={classNames([...helperClassNames, BLOCK])} ref={ref}>
        {children}
      </div>
    );
  }
);
