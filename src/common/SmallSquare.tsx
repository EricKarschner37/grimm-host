import { Square, SquareProps } from "common/Square/Square";

export const SmallSquare = (props: SquareProps) => (
  <div
    style={{
      display: "block",
      height: "300px",
      width: "600px",
      margin: "16px auto",
    }}
  >
    <Square {...props} />
  </div>
);
