export function isMaybe<T>(
  validator: (obj: unknown) => obj is T
): (obj: unknown) => obj is T | undefined | null {
  return (obj: unknown): obj is null | undefined | T => {
    return obj == null || validator(obj);
  };
}
