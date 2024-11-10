import { Flex } from "lib/Flex";
import "./group.scss";

const BLOCK = "lib__group";

export const Group = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <Flex direction="row" className={BLOCK}>
      {children}
    </Flex>
  );
};
