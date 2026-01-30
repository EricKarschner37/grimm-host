import { CategoryMessage } from "../../Play/play.types";
import { StateMessage } from "./game-state.types";
import { isConstant } from "../../lib/utils/typeguard/is-primitive";
import { makeIsShape } from "../../lib/utils/typeguard/is-shape";

export const isCategoriesMessageShape = makeIsShape<CategoryMessage>({
  message: isConstant("categories"),
});

export const isStateMessageShape = makeIsShape<StateMessage>({
  message: isConstant("state"),
});
