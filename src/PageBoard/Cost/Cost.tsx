import { Square } from "../../common/Square/Square";
import { classNames } from "../../lib/utils/classNames";
import "./cost.scss";

export interface CostProps {
  cost: string;
  onClick?: () => void;
  className?: string;
}

const BLOCK = "page-board_cost";

export const Cost = ({ cost, onClick, className }: CostProps) => {
  return (
    <Square
      className={classNames(`${BLOCK}_container`, className)}
      onClick={onClick}
    >
      ${cost}
    </Square>
  );
};
