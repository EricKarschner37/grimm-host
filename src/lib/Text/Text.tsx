import { MarginProps, PaddingProps, Size } from "../types";
import { classNames, getHelperClassNames } from "../utils/classNames";
import "./text.scss";

export type TextVariant = "primary" | "secondary" | "title";
export type TextStyle = "bold" | "italicized" | "default";

export interface TextProps extends MarginProps, PaddingProps {
  text: string;
  size?: Size;
  className?: string;
  isInline?: boolean;
  variant?: TextVariant;
  textStyle?: TextStyle;
}

const BLOCK = "lib_text";

export const Text = ({
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
        className,
		BLOCK,
      )}
    >
      {text}
    </p>
  );
};
