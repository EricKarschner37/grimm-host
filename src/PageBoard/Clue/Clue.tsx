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
  mediaUrl?: string;
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
  mediaUrl,
}: ClueProps) => {
  return (
    <Square onClick={onClick}>
      <Flex
        padding={isFullScreen ? "xl" : "md"}
        direction="column"
        justify="space-between"
		align="center"
        isFullHeight
        isFullWidth
      >
        <p>
          {category} - <span className={`${BLOCK}_cost`}>${cost}</span>
        </p>
		{mediaUrl ? <img className={`${BLOCK}_image`} src={mediaUrl} /> : null}
        <p>{clue}</p>
        <p style={{ visibility: response ? "visible" : "hidden" }}>
          {response ?? "placeholder response"}
        </p>
      </Flex>
    </Square>
  );
};
