import React from "react";

const BASE_URL = process.env.REACT_APP_API_URL;

export const useQuery = <Data>({
  path,
  validator,
}: {
  path: string;
  validator: (obj: any) => obj is Data;
}): { data: Data | null | undefined; error: string | null } => {
  const [data, setData] = React.useState<Data | null | undefined>(undefined);
  const [error, setError] = React.useState<string | null>(null);
  React.useEffect(() => {
    fetch(`${BASE_URL}${path}`)
      .then((response) => response.json())
      .then((obj) => {
        if (validator(obj)) {
          setData(obj);
        } else {
          setError(
            `Error: object ${JSON.stringify(obj)} cannot be deserialized`
          );
        }
      })
      .catch((error) => setError(JSON.stringify(error)));
  }, [path, validator]);

  return { data, error };
};
