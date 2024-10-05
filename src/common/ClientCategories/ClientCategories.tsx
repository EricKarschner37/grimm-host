import { Square } from "common/Square/Square";
import "./client-categories.scss";

export interface ClientCategoriesProps {
  categories: string[];
}

const BLOCK = "common_client-categories";

/**
 * Should be used in player/host contexts,
 * where the user will likely be using a phone.
 */
export const ClientCategories = ({ categories }: ClientCategoriesProps) => {
  return (
    <div className={`${BLOCK}_grid`}>
      {categories.map((category) => (
        <Square>{category}</Square>
      ))}
    </div>
  );
};
