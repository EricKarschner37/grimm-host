import "./action.scss";

export type ActionProps = React.PropsWithChildren<{
  onClick?: () => void;
}>;

const BLOCK = "lib__action";

export const Action = ({ children, onClick }: ActionProps) => {
  return (
    <button onClick={onClick} className={BLOCK}>
      {children}
    </button>
  );
};
