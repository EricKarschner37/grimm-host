import React from "react";
import "./input.scss";

export interface InputProps {
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}

const BLOCK = "lib-input";

export const Input = ({ hint, value, onChange }: InputProps) => {
  return (
    <input
      className={`${BLOCK}`}
      placeholder={hint}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};
