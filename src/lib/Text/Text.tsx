import { MarginProps, PaddingProps, Size } from "lib/types";
import { classNames, getHelperClassNames } from "lib/utils/classNames";
import "./text.scss";

export type TextVariant = "primary" | "secondary" | "title";
export type TextStyle = "bold" | "italicized" | "default";

export type TextProps = React.PropsWithChildren<
  MarginProps &
    PaddingProps & {
      text?: string;
      size?: Size;
      className?: string;
      isInline?: boolean;
      variant?: TextVariant;
      textStyle?: TextStyle;
    }
>;

const BLOCK = "lib_text";

export const Text = ({
  children,
  text,
  size = "md",
  className,
  variant = "primary",
  textStyle = "default",
  ...rest
}: TextProps) => {
  const helperClassNames = getHelperClassNames({ fontSize: size, ...rest });
  const variantClassName = `${BLOCK}--${variant}`;
  const styleClassName = `${BLOCK}--${textStyle}`;
  return (
    <p
      className={classNames(
        ...helperClassNames,
        variantClassName,
        styleClassName,
        BLOCK,
        className
      )}
    >
      {text ?? null}
      {children}
    </p>
  );
};
