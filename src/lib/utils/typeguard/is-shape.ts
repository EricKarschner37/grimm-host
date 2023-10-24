export const makeIsShape = <T>(
  shape: Partial<{
    [K in keyof T]: (obj: any) => boolean;
  }>
) => {
  return (obj: any): obj is T => {
    for (const key in shape) {
      if (!(key in obj)) {
        return false;
      }

      if (key in shape && !shape[key]?.(obj[key])) {
        return false;
      }
    }
    return true;
  };
};
