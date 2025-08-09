export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "none";

export type Variant =
  | "primary"
  | "secondary"
  | "default"
  | "error"
  | "success"
  | "warn";

export interface PaddingProps {
  padding?: Size;
  paddingLeft?: Size;
  paddingRight?: Size;
  paddingTop?: Size;
  paddingBottom?: Size;
  paddingX?: Size;
  paddingY?: Size;
}

export interface MarginProps {
  margin?: Size;
  marginLeft?: Size;
  marginRight?: Size;
  marginTop?: Size;
  marginBottom?: Size;
}

export interface LayoutProps {
  isFullWidth?: boolean;
  isFullHeight?: boolean;
}

export interface DefaultProps extends PaddingProps, MarginProps {
  variant?: Variant;
}
