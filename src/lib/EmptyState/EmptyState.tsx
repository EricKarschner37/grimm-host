import { Flex } from "../Flex";
import { Text } from "../Text";
import React from "react";

export interface EmptyStateProps {
  message?: string;
}

const DEFAULT_EMPTY_STATE_MESSAGE = "Whoops, something went wrong";

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <Flex direction="column" padding="lg" align="center">
      <svg width="200" height="200" viewBox="0 0 100 100">
        <rect fill="black" x="20" y="70" width="10" height="10" />
        <rect fill="black" x="20" y="20" width="10" height="10" />
        <path
          fill="#00000000"
          stroke="black"
          strokeWidth="8"
          d="M 70 20 Q 35 50 70 80"
        />
      </svg>
      <Text
        text={message === undefined ? DEFAULT_EMPTY_STATE_MESSAGE : message}
      />
    </Flex>
  );
};
