import React from "react";

export interface InputProps {
  hint?: string;
  value: string;
  onChange: (value: string) => void;
}

export const Input = ({ hint, value, onChange }: InputProps) => {
  return (
    <input
      placeholder={hint}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};
