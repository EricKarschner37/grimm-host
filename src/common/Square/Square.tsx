import { classNames } from "../../lib/utils/classNames";

import "./square.scss";
import { Flex } from "../../lib/Flex";

const BLOCK = "common_square";

export type SquareProps = React.PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

export const Square = ({ children, className, onClick }: SquareProps) => {
  return (
    <Flex
      direction="column"
      justify="center"
      isFullWidth
      isFullHeight
      className={classNames(
        BLOCK,
        className,
        Boolean(onClick) ? `${BLOCK}_clickable` : undefined
      )}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};
