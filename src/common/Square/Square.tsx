import { Flex } from "lib/Flex";
import { classNames } from "lib/utils/classNames";

import "./square.scss";

const BLOCK = "common_square";

export interface SquareProps {
  className?: string;
  onClick?: () => void;
}

export const Square = ({
  children,
  className,
  onClick,
}: React.PropsWithChildren<SquareProps>) => {
  return (
    <Flex
      justify="center"
      isFullWidth
      isFullHeight
      align="center"
      className={classNames([BLOCK, className])}
      onClick={onClick}
    >
      {children}
    </Flex>
  );
};
