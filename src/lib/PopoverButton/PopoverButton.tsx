import { Variant } from "lib/types";
import "./popover-button.scss";
import React from "react";
import { XIcon } from "lib/icons/XIcon";
import { Icon } from "lib/icons/icons-types";
import { classNames } from "lib/utils/classNames";

const BLOCK = "lib_popover-button";

export type PopoverButtonProps = React.PropsWithChildren<{
  variant: Variant;
  icon: Icon;
  onClick: () => void;
}>;

export const PopoverButton = ({
  children,
  variant,
  icon,
  onClick,
}: PopoverButtonProps) => {
  return (
    <span className={`${BLOCK}_container`}>
      <button
        className={classNames([
          `${BLOCK}_button`,
          `${BLOCK}_button-${variant}`,
        ])}
        onClick={onClick}
      >
        {icon}
      </button>
      {children}
    </span>
  );
};
