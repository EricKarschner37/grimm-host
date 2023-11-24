import { Category } from "PageBoard/Category/Category";
import { BoardSocketWrapper } from "PageBoard/page-board.hooks";
import { GameState } from "common/types/game-state.types";

import "./board.scss";
import { match } from "ts-pattern";
import React from "react";
import { Square } from "common/Square/Square";
import { Cost } from "PageBoard/Cost/Cost";
import { Clue } from "PageBoard/Clue/Clue";

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

    const categories = gameState.categories.map((category) => ({
      element: <Category category={category} key={category} />,
    }));

    rows.push(categories);

    for (let i = 0; i < 5; i += 1) {
      const cols = [];
      const cost = match(gameState.round)
        .with("single", () => 200 * (i + 1))
        .with("double", () => 400 * (i + 1))
        .with("final", () => 0)
        .exhaustive();

      for (let j = 0; j < 6; j += 1) {
        const hasBeenRevealed = gameState.cluesShown & (1 << (i * 6 + j));
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
  }, [gameState.categories, gameState.cluesShown, gameState.round, socket]);

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

  return <div className={`${BLOCK}_container`}>{mainContent}</div>;
};
