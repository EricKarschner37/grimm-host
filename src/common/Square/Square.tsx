import { Flex } from "lib/Flex";
import { classNames } from "lib/utils/classNames";

import "./square.scss";

const BLOCK = "common_square";

export type SquareProps = React.PropsWithChildren<{
  className?: string;
  onClick?: () => void;
}>;

export const Square = ({ children, className, onClick }: SquareProps) => {
  return (
    <Flex
      justify="center"
      isFullWidth
      isFullHeight
      align="center"
      className={classNames([
        BLOCK,
        className,
        Boolean(onClick) ? `${BLOCK}_clickable` : undefined,
      ])}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};
