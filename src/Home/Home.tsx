import { Flex } from "../lib/Flex";
import { PlayTab } from "./PlayTab/PlayTab";
import { useNavigate } from "react-router-dom";
import { BoardTab } from "./BoardTab";
import { HostTab } from "./HostTab";
import { TabList } from "../lib/TabList/TabList";
import { Panel } from "../lib/Panel/Panel";

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
  const navigate = useNavigate();

  const tabContent: Record<Tab, JSX.Element> = {
    play: <PlayTab />,
    host: <HostTab />,
    board: <BoardTab />,
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Panel>
        <TabList
          tabs={tabs}
          selectedTab={tab}
          onSelectTab={(newTab) => navigate(`/${newTab}`)}
        />
        {tabContent[tab]}
      </Panel>
    </div>
  );
};
