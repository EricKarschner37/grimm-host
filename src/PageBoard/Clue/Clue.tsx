import { Square } from "common/Square/Square";
import "./clue.scss";

export interface ClueProps {
  cost: string;
  clue: string;
  response?: string;
  isActive?: string;
  onClick?: () => void;
}

const BLOCK = "page-board_clue";

export const Clue = ({
  cost,
  clue,
  response,
  onClick,
  isActive,
}: ClueProps) => {
  return (
    <Square onClick={onClick}>
      <div className={`${BLOCK}_container`}>
        <p className={`${BLOCK}_cost`}>${cost}</p>
        <p>{clue}</p>
        {response && <p>{response}</p>}
      </div>
    </Square>
  );
};
