import { isArray } from "./is-array";
import { isNumber, isString } from "./is-primitive";

export const isTypedArray = <T>(
  obj: any[],
  validator: (item: any) => item is T
): obj is T[] => isArray(obj) && obj.every(validator);

export const isStringArray = (obj: any[]) => isTypedArray(obj, isString);

export const isNumberArray = (obj: any[]) => isTypedArray(obj, isNumber);
