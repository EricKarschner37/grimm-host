export const makeIsShape = <T>(
  shape: Partial<{
    [K in keyof T]: (obj: any) => boolean;
  }>
) => {
  return (obj: any): obj is T => {
    for (const key in shape) {
      if (!shape[key]?.(obj[key])) {
        return false;
      }
    }
    return true;
  };
};
