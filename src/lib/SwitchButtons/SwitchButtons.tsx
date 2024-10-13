import React from "react";
import "./switch-buttons.scss";
import { classNames } from "lib/utils/classNames";

export interface SwitchButtonsProps<Opt> {
  options: Opt[];
  getLabelForOption: (opt: Opt) => string;
  selected: Opt;
  setSelected: (opt: Opt) => void;
}

const BLOCK = "lib_switch-buttons";

export const SwitchButtons = <Opt,>({
  options,
  getLabelForOption,
  selected,
  setSelected,
}: SwitchButtonsProps<Opt>) => {
  const buttons = options.map((option) => (
    <p
      key={JSON.stringify(option)}
      className={classNames(
        BLOCK,
        selected === option ? `${BLOCK}_selected` : undefined
      )}
      onClick={() => setSelected(option)}
    >
      {getLabelForOption(option)}
    </p>
  ));
  return <>{buttons}</>;
};
