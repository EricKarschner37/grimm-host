import "./category.scss";
import { Square } from "../../common/Square/Square";

const BLOCK = "page-board_category";

export const Category = ({ category }: { category: string }) => {
  return <Square className={`${BLOCK}_container`}>{category}</Square>;
};
