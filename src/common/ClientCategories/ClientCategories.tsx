import { Square } from "../Square/Square";
import "./client-categories.scss";
import React from "react";
import { Flex } from "../../lib/Flex";
import { Cost } from "../../PageBoard/Cost/Cost";
import { PlayerSocketWrapper } from "../../Play/play.hooks";
import { HostSocketWrapper } from "../../PageHost/page-host.hooks";
import { isClueShown } from "../../lib/utils/is-clue-shown";
import { BareDefaultRound } from "../types/game-state.types";
import { LeftArrowIcon } from "../../lib/icons/LeftArrowIcon";
import { FlexItem } from "../../lib/FlexItem/FlexItem";

export interface ClientCategoriesProps {
  bareRound: BareDefaultRound;
  cluesShown: number;
  socket: PlayerSocketWrapper | HostSocketWrapper;
  canReveal?: boolean;
}

const BLOCK = "common_client-categories";

/**
 * Should be used in player/host contexts,
 * where the user will likely be using a phone.
 */
export const ClientCategories = ({
  bareRound,
  cluesShown,
  socket,
  canReveal = false,
}: ClientCategoriesProps) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState<
    number | null
  >(null);
  if (selectedCategoryIndex != null) {
    return (
      <Flex isFullWidth direction="column" align="stretch" isFullHeight>
      <FlexItem grow>
        <Square
          className={`${BLOCK}_square`}
          onClick={() => setSelectedCategoryIndex(null)}
        >
          <Flex
            isFullWidth
            direction="row"
            justify="space-between"
            align="center"
          >
            {LeftArrowIcon}
            {bareRound.categories[selectedCategoryIndex].category}
            <div />
          </Flex>
        </Square>
	</FlexItem>
        {bareRound.categories[selectedCategoryIndex].clue_costs.map((cost, i) =>
	
	<FlexItem grow key={cost}>
	{isClueShown(cluesShown, i, selectedCategoryIndex) ? (
            <Square className={`${BLOCK}_square`} />
          ) : (
            <Cost
              cost={String(cost)}
              onClick={
                canReveal
                  ? () => {
                      socket.reveal(i, selectedCategoryIndex);
                    }
                  : undefined
              }
              className={`${BLOCK}_square`}
            />
          )}
	  </FlexItem>
        )}
      </Flex>
    );
  }

  return (
    <div className={`${BLOCK}_grid`}>
      {bareRound.categories.map(({ category }, index) => (
        <Square
          onClick={() => setSelectedCategoryIndex(index)}
          className={`${BLOCK}_square`}
        >
          {category}
        </Square>
      ))}
    </div>
  );
};
