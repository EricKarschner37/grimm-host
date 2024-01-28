import { PagePlayerActive } from "Play/PagePlayerActive/PagePlayerActive";
import { UsernameEntry } from "Play/UsernameEntry";
import { Flex } from "lib/Flex";
import { FlexItem } from "lib/FlexItem/FlexItem";
import { Text } from "lib/Text";
import { useGetGame } from "lib/utils/hooks/use-get-game";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

export const Play = () => {
  const { gameIndex } = useParams<"gameIndex">();
  const [searchParams] = useSearchParams();

  const indexNumber = parseInt(gameIndex ?? "NaN");

  const { data, isLoading } = useGetGame({
    gameIndex: indexNumber,
    enabled: !Number.isNaN(indexNumber),
  });

  // TODO - handle 404 from game endpoint

  if (!gameIndex || Number.isNaN(indexNumber)) {
    return <Navigate to="/" replace={true} />;
  }

  const username = searchParams.get("username");

  const players = data?.players ?? [];

  if (!username) {
    return (
      <Flex
        direction="column"
        padding="md"
        justify="space-between"
        isFullHeight
      >
        <FlexItem>
          <Text
            marginTop="none"
            marginBottom="xs"
            text={`Join Game #${gameIndex}`}
            variant="title"
          />

          {isLoading ? (
            <Text
              variant="secondary"
              text="Loading game details..."
              textStyle="italicized"
            />
          ) : players.length > 0 ? (
            <>
              <Text marginBottom="sm" text="Current players:" />{" "}
              {players.map((player) => (
                <Text margin="none" text={`- ${player}`} variant="secondary" />
              ))}
            </>
          ) : (
            <Text text="No active players -- be the first!" />
          )}
        </FlexItem>
        <UsernameEntry />
      </Flex>
    );
  }

  return (
    <>
      <PagePlayerActive username={username} gameIndex={indexNumber} />
    </>
  );
};
