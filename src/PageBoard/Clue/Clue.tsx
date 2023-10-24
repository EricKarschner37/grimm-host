import { Square } from "common/Square/Square";
import { Flex } from "lib/Flex";
import React from "react";

export interface ClueProps {
  clue: string;
  response?: string;
  isActive?: string;
}

const BLOCK = "page-board_clue";

export const Clue = ({ clue, response, isActive }: ClueProps) => {
  return (
    <Square>
      <p>{clue}</p>
      {response && <p>{response}</p>}
    </Square>
  );
};
