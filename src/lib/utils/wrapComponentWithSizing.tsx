import { MarginProps, PaddingProps, Size } from "lib/types";
import { CSSProperties } from "react";

const sizeMap: Record<Size, string> = {
  xs: "2px",
  sm: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
};

export const wrapComponentWithSizing = <Props,>(
  Component: React.FC<Props & { style: CSSProperties }>
): React.FC<Props & PaddingProps & MarginProps> => {
  return ({
    margin,
    marginTop,
    marginLeft,
    marginRight,
    marginBottom,
    padding,
    paddingLeft,
    paddingRight,
    paddingBottom,
    paddingTop,
    ...props
  }: Props & PaddingProps & MarginProps) => {
    const style: React.CSSProperties = {};
    if (margin) {
      style["margin"] = sizeMap[margin];
    }

    if (marginTop) {
      style["marginTop"] = sizeMap[marginTop];
    }

    if (marginBottom) {
      style["marginBottom"] = sizeMap[marginBottom];
    }

    if (marginRight) {
      style["marginRight"] = sizeMap[marginRight];
    }

    if (marginLeft) {
      style["marginLeft"] = sizeMap[marginLeft];
    }

    if (padding) {
      style["padding"] = sizeMap[padding];
    }

    if (paddingTop) {
      style["paddingTop"] = sizeMap[paddingTop];
    }

    if (paddingBottom) {
      style["paddingBottom"] = sizeMap[paddingBottom];
    }

    if (paddingRight) {
      style["paddingRight"] = sizeMap[paddingRight];
    }

    if (paddingLeft) {
      style["paddingLeft"] = sizeMap[paddingLeft];
    }

    console.log(JSON.stringify(style));

    // TODO this should _defnitely_ be done better
    // @ts-expect-error
    return <Component {...props} margin={margin} style={style} />;
  };
};
