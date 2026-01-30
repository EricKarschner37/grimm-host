import { classNames } from "../utils/classNames";
import "./flex-item.scss";

export type FlexItemProps = React.PropsWithChildren<{
  alignSelf?: "start" | "end" | "center" | "stretch";
  grow?: number | boolean;
  shrink?: number | boolean;
  basis?: number | string;
  className?: string;
}>;

const BLOCK = "lib_flex-item";

export const FlexItem = ({
  alignSelf,
  grow,
  shrink,
  basis,
  children,
  className,
}: FlexItemProps) => {
  const flexGrow = !grow ? undefined : typeof grow === "boolean" ? 1 : grow;
  const flexShrink = !grow
    ? undefined
    : typeof shrink === "boolean"
    ? 1
    : shrink;
  return (
    <div
      className={classNames(BLOCK, className)}
      style={{ alignSelf, flexGrow, flexShrink, flexBasis: basis }}
    >
      {children}
    </div>
  );
};
