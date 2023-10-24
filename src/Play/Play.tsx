import { ActivePlayerScreen } from "Play/ActivePlayerScreen/ActivePlayerScreen";
import { UsernameEntry } from "Play/UsernameEntry";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

export const Play = () => {
  const { gameIndex } = useParams<"gameIndex">();
  const [searchParams] = useSearchParams();

  const indexNumber = parseInt(gameIndex ?? "NaN");
  if (!gameIndex || Number.isNaN(indexNumber)) {
    return <Navigate to="/" replace={true} />;
  }

  const username = searchParams.get("username");

  if (!username) {
    return <UsernameEntry />;
  }

  return (
    <>
      <ActivePlayerScreen username={username} gameIndex={indexNumber} />
    </>
  );
};
