import { Square, SquareProps } from "common/Square/Square";

export const SmallSquare = (props: SquareProps) => (
  <div
    style={{
      display: "block",
      height: "40%",
      width: "80%",
      maxWidth: "600px",
      margin: "16px auto",
    }}
  >
    <Square {...props} />
  </div>
);
