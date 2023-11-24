import { Square } from "common/Square/Square";
import "./clue.scss";

const BLOCK = "page-play_clue";

export interface ClueProps {
  category: string;
  cost: string;
  clue: string;
  response?: string;
}

export const Clue = ({ category, cost, clue, response }: ClueProps) => {
  return (
    <Square>
      <div className={`${BLOCK}_container`}>
        <p>{category}</p>
        <p className={`${BLOCK}_cost`}>${cost}</p>
        <p>{clue}</p>
        {response && <p>{response}</p>}
      </div>
    </Square>
  );
};
