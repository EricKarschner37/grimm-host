import { MarginProps, PaddingProps, Size, Variant } from "lib/types";
import "./button.scss";
import {
  classNames,
  getHelperClassNames,
  getSizeDown,
} from "lib/utils/classNames";
import { Icon } from "lib/icons/icons-types";
import { Flex } from "lib/Flex";

export interface ButtonProps extends PaddingProps, MarginProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  variant?: Variant;
  size?: Size;
  icon?: Icon;
}

const BLOCK = "lib_button";

export const Button = ({
  padding,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  margin,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom,
  onClick,
  label,
  icon,
  size = "md",
  variant = "default",
}: ButtonProps) => {
  const helperClassNames = getHelperClassNames({
    padding,
    paddingLeft: paddingLeft ?? size,
    paddingRight: paddingRight ?? size,
    paddingTop: paddingTop ?? getSizeDown(size, 2),
    paddingBottom: paddingBottom ?? getSizeDown(size, 2),
    margin,
    marginLeft,
    marginBottom,
    marginTop,
    marginRight,
    fontSize: size,
  });
  return (
    <button
      className={classNames([
        BLOCK,
        `${BLOCK}_variant-${variant}`,
        ...helperClassNames,
      ])}
      onClick={onClick}
    >
      <Flex direction="row" gap="2px" align="center" justify="center">
        {label}
        {icon}
      </Flex>
    </button>
  );
};
