import { LayoutProps, MarginProps, PaddingProps, Size } from "../types";

type Name =
  | string
  | null
  | undefined
  | Record<string, boolean | null | undefined>;

export const classNames = (...names: Name[]) =>
  names
    .flatMap((name) =>
      typeof name !== "object" || name == null
        ? name
        : Object.entries(name).map(([key, value]) => (value ? key : null))
    )
    .filter((name) => name !== undefined && name !== null && name !== "")
    .join(" ");

export const getHelperClassNames = ({
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  paddingX,
  paddingY,
  margin,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  fontSize,
  isInline,
  isFullWidth,
  isFullHeight,
}: PaddingProps &
  MarginProps &
  LayoutProps & { fontSize?: Size; isInline?: boolean }): string[] => {
  const result: string[] = [];
  if (margin) {
    result.push(`margin-${margin}`);
  }

  if (marginTop) {
    result.push(`marginTop-${marginTop}`);
  }

  if (marginBottom) {
    result.push(`marginBottom-${marginBottom}`);
  }

  if (marginRight) {
    result.push(`marginRight-${marginRight}`);
  }

  if (marginLeft) {
    result.push(`marginLeft-${marginLeft}`);
  }

  if (padding) {
    result.push(`padding-${padding}`);
  }

  if (paddingTop || paddingY) {
    result.push(`paddingTop-${paddingTop || paddingY}`);
  }

  if (paddingBottom || paddingY) {
    result.push(`paddingBottom-${paddingBottom || paddingY}`);
  }

  if (paddingRight || paddingX) {
    result.push(`paddingRight-${paddingRight || paddingX}`);
  }

  if (paddingLeft || paddingX) {
    result.push(`paddingLeft-${paddingLeft || paddingX}`);
  }

  if (fontSize) {
    result.push(`fontSize-${fontSize}`);
  }

  if (isInline) {
    result.push("displayInline");
  }

  if (isFullWidth) {
    result.push("fullWidth");
  }

  if (isFullHeight) {
    result.push("fullHeight");
  }

  return result;
};

const sizesInOrder = ["none", "xs", "sm", "md", "lg", "xl"] as const;

export const getSizeUp = (size: Size, count: number = 1): Size => {
  const index = sizesInOrder.indexOf(size);
  if (index === sizesInOrder.length - count) {
    return size;
  }

  return sizesInOrder[index + count];
};

export const getSizeDown = (size: Size, count: number = 1): Size => {
  const index = sizesInOrder.indexOf(size);
  if (index - count < 0) {
    return size;
  }

  return sizesInOrder[index - count];
};
