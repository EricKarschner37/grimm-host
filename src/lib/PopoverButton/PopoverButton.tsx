import { Variant } from "../types";
import "./popover-button.scss";
import React from "react";
import { XIcon } from "../icons/XIcon";
import { Icon } from "../icons/icons-types";
import { classNames } from "../utils/classNames";
import { CircleIcon } from "../icons/CircleIcon";

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
        className={classNames(`${BLOCK}_button`, `${BLOCK}_button-${variant}`)}
        onClick={onClick}
      >
        <div className={`${BLOCK}_base`}>{CircleIcon}</div>
        <div className={`${BLOCK}_fore`}>{icon}</div>
      </button>
      {children}
    </span>
  );
};
