import { MarginProps, PaddingProps } from "lib/types";
import "./flex.scss";
import { classNames, getHelperClassNames } from "lib/utils/classNames";

type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type FlexJustify =
  | "center"
  | "start"
  | "end"
  | "flex-start"
  | "flex-end"
  | "left"
  | "right"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch";

type FlexAlign = "flex-start" | "flex-end" | "center" | "baseline" | "stretch";

interface FlexProps extends PaddingProps, MarginProps {
  direction?: FlexDirection;
  wrap?: FlexWrap;

  gap?: string;
  rowGap?: string;
  columnGap?: string;

  justify?: FlexJustify;
  align?: FlexAlign;

  isFullWidth?: boolean;
  isFullHeight?: boolean;
  className?: string;

  onClick?: () => void;
}

const BLOCK = "lib_flex";

export const Flex = ({
  direction = "row",
  wrap = "nowrap",
  gap,
  justify,
  align,
  children,
  className,
  onClick,
  ...rest
}: React.PropsWithChildren<FlexProps>) => {
  const helperClassNames = getHelperClassNames(rest);
  return (
    <div
      className={classNames(BLOCK, ...helperClassNames, className)}
      style={{
        gap,
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
