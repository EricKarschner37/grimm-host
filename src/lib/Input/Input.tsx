import React from "react";
import "./input.scss";
import { classNames } from "lib/utils/classNames";

export interface InputProps {
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: FocusEvent) => void;
  className?: string;
}

const BLOCK = "lib-input";

export const Input = ({
  hint,
  value,
  onChange,
  className,
  onBlur,
}: InputProps) => {
  return (
    <input
      className={classNames([`${BLOCK}`, className])}
      placeholder={hint}
      onChange={(e) => onChange(e.target.value)}
      value={value}
      onBlur={(e) => onBlur?.(e.nativeEvent)}
    />
  );
};
