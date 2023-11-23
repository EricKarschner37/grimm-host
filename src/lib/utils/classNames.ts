import { MarginProps, PaddingProps, Size } from "lib/types";

export const classNames = (names: (string | null | undefined)[]) =>
  names
    .filter((name) => name !== undefined && name !== null && name !== "")
    .join(" ");

export const getHelperClassNames = ({
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  margin,
  marginTop,
  marginLeft,
  marginRight,
  marginBottom,
  fontSize,
  isInline,
}: PaddingProps &
  MarginProps & { fontSize?: Size; isInline?: boolean }): string[] => {
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

  if (paddingTop) {
    result.push(`paddingTop-${paddingTop}`);
  }

  if (paddingBottom) {
    result.push(`paddingBottom-${paddingBottom}`);
  }

  if (paddingRight) {
    result.push(`paddingRight-${paddingRight}`);
  }

  if (paddingLeft) {
    result.push(`paddingLeft-${paddingLeft}`);
  }

  if (fontSize) {
    result.push(`fontSize-${fontSize}`);
  }

  if (isInline) {
    result.push("displayInline");
  }

  return result;
};

const sizesInOrder = ["xs", "sm", "md", "lg", "xl"] as const;

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
