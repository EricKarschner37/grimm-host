import { Square, SquareProps } from "common/Square/Square";

const BLOCK = "common_small-square";

export const SmallSquare = (props: SquareProps) => (
  <div
    className={BLOCK}
    style={{
      display: "block",
      height: "fit-content",
      maxHeight: "60%",
      width: "80%",
      maxWidth: "600px",
      margin: "16px auto",
      overflow: "scroll",
    }}
  >
    <Square {...props} />
  </div>
);
