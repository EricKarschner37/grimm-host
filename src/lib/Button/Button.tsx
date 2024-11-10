import { MarginProps, PaddingProps, Size, Variant } from "lib/types";
import "./button.scss";
import {
  classNames,
  getHelperClassNames,
  getSizeDown,
} from "lib/utils/classNames";
import { Icon } from "lib/icons/icons-types";
import { Flex } from "lib/Flex";
import { NavLink } from "react-router-dom";

export interface ButtonProps extends PaddingProps, MarginProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label: string;
  variant?: Variant;
  size?: Size;
  icon?: Icon;
  isEnabled?: boolean;
  href?: string;
}

const BLOCK = "lib_button";

const Wrapper = ({
  children,
  href,
  isEnabled,
}: React.PropsWithChildren<{ href?: string; isEnabled?: boolean }>) => {
  if (!!href && isEnabled) {
    return <NavLink to={href}>{children}</NavLink>;
  }
  return children;
};

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
  href,
  size = "md",
  variant = "default",
  isEnabled = true,
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
      className={classNames(
        ...helperClassNames,
        BLOCK,
        `${BLOCK}_variant-${variant}`,
        { [`${BLOCK}--disabled`]: !isEnabled }
      )}
      onClick={onClick}
    >
      <Wrapper href={href} isEnabled={isEnabled}>
        <Flex direction="row" gap="2px" align="center" justify="center">
          {label}
          {icon}
        </Flex>
      </Wrapper>
    </button>
  );
};
