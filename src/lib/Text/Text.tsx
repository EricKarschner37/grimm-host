import { MarginProps, PaddingProps, Size } from "lib/types";
import { classNames, getHelperClassNames } from "lib/utils/classNames";

export interface TextProps extends MarginProps, PaddingProps {
  text: string;
  size?: Size;
  className?: string;
  isInline?: boolean;
}

export const Text = ({ text, size = "md", className, ...rest }: TextProps) => {
  const helperClassNames = getHelperClassNames({ fontSize: size, ...rest });
  return <p className={classNames([...helperClassNames, className])}>{text}</p>;
};
