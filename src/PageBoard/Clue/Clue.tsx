import { Square } from "common/Square/Square";
import "./clue.scss";
import { Flex } from "lib/Flex";
import { FlexItem } from "lib/FlexItem/FlexItem";

export interface ClueProps {
  category: string;
  cost: string;
  clue: string;
  response?: string;
  isActive?: string;
  onClick?: () => void;
  isFullScreen?: boolean;
}

const BLOCK = "page-board_clue";

export const Clue = ({
  category,
  cost,
  clue,
  response,
  onClick,
  isActive,
  isFullScreen = false,
}: ClueProps) => {
  return (
    <Square onClick={onClick}>
      <Flex
        padding={isFullScreen ? "xl" : "md"}
        direction="column"
        justify="space-between"
        isFullHeight
        isFullWidth
      >
        <p>
          {category} - <span className={`${BLOCK}_cost`}>${cost}</span>
        </p>
        <p>{clue}</p>
        <p style={{ visibility: response ? "visible" : "hidden" }}>
          {response ?? "placeholder response"}
        </p>
      </Flex>
    </Square>
  );
};
