import { isArray } from "lib/utils/typeguard/is-array";
import { isNumber, isString } from "lib/utils/typeguard/is-primitive";

export function isTypedArray<T>(
  validator: (item: unknown) => item is T
): (obj: unknown) => obj is T[];
export function isTypedArray<T>(
  validator: (item: unknown) => item is T,
  obj: unknown
): obj is T[];
export function isTypedArray<T>(
  validator: (item: any) => item is T,
  obj?: unknown
) {
  if (obj) {
    return isArray(obj) && obj.every(validator);
  }

  return (value: unknown) => Array.isArray(value) && value.every(validator);
}

export const isStringArray = isTypedArray(isString);

export const isNumberArray = isTypedArray(isNumber);
