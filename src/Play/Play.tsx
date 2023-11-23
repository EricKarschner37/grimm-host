import { PagePlayerActive } from "Play/PagePlayerActive/PagePlayerActive";
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
      <PagePlayerActive username={username} gameIndex={indexNumber} />
    </>
  );
};
