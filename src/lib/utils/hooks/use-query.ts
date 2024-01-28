import React from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

export interface QueryArgs<Data> {
  enabled?: boolean;
  path: string;
  validator: (obj: any) => obj is Data;
}

export interface QueryResult<Data> {
  data: Data | null | undefined;
  error: string | null;
  isLoading: boolean;
}

export const useQuery = <Data>({
  path,
  validator,
  enabled = true,
}: QueryArgs<Data>): QueryResult<Data> => {
  const [data, setData] = React.useState<Data | null | undefined>(undefined);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    if (enabled) {
      fetch(`${BASE_URL}${path}`)
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          setIsLoading(false);
          if (validator(obj)) {
            setData(obj);
          } else {
            setError(
              `Error: object ${JSON.stringify(obj)} cannot be deserialized`
            );
          }
        })
        .catch((error) => setError(JSON.stringify(error)));
    }
  }, [path, validator, enabled]);

  return { data, error, isLoading: isLoading && enabled };
};
