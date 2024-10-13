import { Square } from "common/Square/Square";
import { classNames } from "lib/utils/classNames";
import "./cost.scss";

export interface CostProps {
  cost: string;
  onClick?: () => void;
}

const BLOCK = "page-board_cost";

export const Cost = ({ cost, onClick }: CostProps) => {
  return (
    <Square className={classNames(`${BLOCK}_container`)} onClick={onClick}>
      ${cost}
    </Square>
  );
};
