import React from "react";

export interface SelectProps<T> {
  items: {
    value: T;
    key: string | number | string[] | undefined;
    label?: string;
  }[];
  onChange: (selected: T | undefined) => void;
  selected: string | number | string[] | undefined;
  label?: string;
  hasSelectPrompt?: boolean;
}
export const Select = <T,>({
  items,
  onChange,
  selected,
  label,
  hasSelectPrompt = true,
}: SelectProps<T>) => {
  const id = React.useId();
  const itemsByHash = React.useMemo(
    () => new Map(items.map((item) => [item.key, item])),
    [items]
  );
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        value={selected}
        name={label}
        id={id}
        onChange={(e) => onChange(itemsByHash.get(e.target.value)?.value)}
      >
        {hasSelectPrompt && (
          <option disabled selected={selected === undefined} value={undefined}>
            -- Player --
          </option>
        )}
        {items.map(({ key, label: itemLabel }) => (
          <option value={key}>{itemLabel}</option>
        ))}
      </select>
    </>
  );
};
