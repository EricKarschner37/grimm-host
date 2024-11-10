import { Text } from "lib/Text";
import "./label.scss";
const BLOCK = "lib__label";

export const Label = ({ text }: { text: string }) => {
  return <Text padding="xs" margin="none" text={text} className={BLOCK} />;
};
