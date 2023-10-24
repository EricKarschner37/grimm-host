import { Flex } from "lib/Flex";
import { PlayTab } from "Home/PlayTab/PlayTab";
import { Button } from "lib/Button/Button";
import { NavLink } from "react-router-dom";
import { BoardTab } from "Home/BoardTab";

type Tab = "play" | "host" | "board";

export interface HomeProps {
  tab: Tab;
}

const tabs = [
  { value: "play", label: "Play" },
  { value: "host", label: "Host" },
  { value: "board", label: "Board" },
] as const;

export const Home = ({ tab }: HomeProps) => {
  const tabContent: Record<Tab, JSX.Element> = {
    play: <PlayTab />,
    host: <></>,
    board: <BoardTab />,
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Flex gap="8px" direction="row" marginTop="lg" marginLeft="lg">
        {tabs.map(({ value, label }) => (
          <NavLink to={`/${value}`}>
            <Button
              variant={tab === value ? "secondary" : "default"}
              label={label}
            />
          </NavLink>
        ))}
      </Flex>
      {tabContent[tab]}
    </div>
  );
};
