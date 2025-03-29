import { Category } from "PageBoard/Category/Category";
import { BoardSocketWrapper } from "PageBoard/page-board.hooks";
import { GameState } from "common/types/game-state.types";

import "./board.scss";
import { match } from "ts-pattern";
import React from "react";
import { Square } from "common/Square/Square";
import { Cost } from "PageBoard/Cost/Cost";
import { Clue } from "PageBoard/Clue/Clue";
import { isClueShown } from "lib/utils/is-clue-shown";

export interface BoardProps {
  gameState: GameState;
  socket: BoardSocketWrapper;
}

const BLOCK = "page-board_board";

interface CategorySquare {
  element: JSX.Element;
}

interface ClueSquare {
  element: JSX.Element;
  cost: number;
  hasBeenRevealed: boolean;
}

type BoardSquare = CategorySquare | ClueSquare;

const useBoard = ({ gameState, socket }: BoardProps) =>
  React.useMemo(() => {
    const rows: BoardSquare[][] = [];

    if (gameState.bareRound.round_type === "FinalRound") {
      return rows;
    }

    const categories = gameState.bareRound.categories.map(({ category }) => ({
      element: <Category category={category} key={category} />,
    }));

    rows.push(categories);

    for (let i = 0; i < 5; i += 1) {
      const cols = [];

      for (let j = 0; j < 6; j += 1) {
        const hasBeenRevealed = isClueShown(gameState.cluesShown, i, j);
        const cost = gameState.bareRound.categories[j].clue_costs[i];
        const element = hasBeenRevealed ? (
          <Square />
        ) : (
          <Cost
            cost={String(cost)}
            onClick={() => {
              socket.reveal(i, j);
            }}
          />
        );
        cols.push({ element, cost, hasBeenRevealed });
      }

      rows.push(cols);
    }

    return rows;
  }, [gameState.bareRound, gameState.cluesShown, socket]);

export const Board = ({ gameState, socket }: BoardProps) => {
  const board = useBoard({ gameState, socket });

  let mainContent: JSX.Element | null = null;

  if (gameState.type === "board") {
    mainContent = (
      <div className={`${BLOCK}_grid`}>
        {board.flatMap((row) => row.map((square) => square.element))}
      </div>
    );
  }

  if (gameState.type === "clue") {
    mainContent = (
      <Clue
        category={gameState.category}
        onClick={socket.goToResponse}
        cost={String(gameState.cost)}
        clue={gameState.clue}
		mediaUrl={gameState.mediaUrl}
        isFullScreen
      />
    );
  }

  if (gameState.type === "response") {
    mainContent = (
      <Clue
        category={gameState.category}
        onClick={socket.showBoard}
        cost={String(gameState.cost)}
        clue={gameState.clue}
        response={gameState.response}
        isFullScreen
      />
    );
  }

  if (gameState.type === "daily-double") {
    mainContent = (
      <Clue
        category={gameState.category}
        onClick={() =>
          window.confirm("Skip daily double?") && socket.goToResponse()
        }
        cost={String("???")}
        clue={"Daily Double!"}
      />
    );
  }

  if (gameState.type === "final-wager") {
    mainContent = (
      <Clue
        category={gameState.category}
        onClick={() =>
          window.confirm("Skip final jeopardy?") && socket.goToResponse()
        }
        cost={String("???")}
        clue="Final Jeopardy!"
      />
    );
  }

  if (gameState.type === "final-clue") {
    mainContent = (
      <Clue
        category={gameState.category}
        onClick={() =>
          window.confirm("Skip final jeopardy?") && socket.goToResponse()
        }
        cost={String("???")}
        clue={gameState.clue}
      />
    );
  }

  return <div style={{ height: "100%", width: "100%" }}>{mainContent}</div>;
};
