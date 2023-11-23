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

  grow?: number | boolean;

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
  isFullWidth = true,
  isFullHeight = false,
  className,
  onClick,
  grow,
  ...rest
}: React.PropsWithChildren<FlexProps>) => {
  const helperClassNames = getHelperClassNames(rest);
  return (
    <div
      className={classNames([
        BLOCK,
        ...helperClassNames,
        isFullWidth ? "fullWidth" : "fitWidth",
        isFullHeight ? "fullHeight" : "fitHeight",
        className,
      ])}
      style={{
        gap,
        flexDirection: direction,
        flexWrap: wrap,
        justifyContent: justify,
        alignItems: align,
        flexGrow:
          grow === false || grow === undefined ? 0 : grow === true ? 1 : grow,
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
