export const isString = (obj: any): obj is string => typeof obj === "string";

export const isNumber = (obj: any): obj is number => typeof obj === "number";

export const isBoolean = (obj: any): obj is boolean => typeof obj === "boolean";

export const isNull = (obj: any): obj is null => obj === null;

export const isUndefined = (obj: any): obj is undefined => obj === undefined;

export type Primitive = string | number | undefined | boolean | null;

export const isConstant =
  <C extends Primitive>(value: C) =>
  (obj: any): obj is C =>
    obj === value;
