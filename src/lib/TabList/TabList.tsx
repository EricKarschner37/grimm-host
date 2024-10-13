import { classNames } from "lib/utils/classNames";
import "./tab-list.scss";
import { Flex } from "lib/Flex";
import { TabListUnderlist } from "lib/TabList/TabListUnderline";

export interface TabListProps<T extends string> {
  selectedTab?: T;
  tabs: readonly { value: T; label?: React.ReactNode }[];
  onSelectTab: (newTab: T) => void;
}

const BLOCK = "lib_tab-list";

export const TabList = <T extends string>({
  selectedTab,
  tabs,
  onSelectTab,
}: TabListProps<T>) => {
  return (
    <Flex>
      {tabs.map(({ value, label }) => (
        <Flex
          direction="column"
          className={classNames(
            `${BLOCK}_item`,
            selectedTab === value ? `${BLOCK}_item-active` : undefined
          )}
          onClick={() => onSelectTab(value)}
        >
          {label === undefined ? value : label}
          {selectedTab === value && <TabListUnderlist />}
        </Flex>
      ))}
    </Flex>
  );
};
