import type { CollectionBeforeValidateHook, FieldHook } from "payload";

const UNIQUE_KEYS = ["slug", "path", "legacyId"] as const;

export const emptyStringToNull: FieldHook = ({ value }) => {
  if (value === "") return null;
  return value;
};

export const emptyUniqueToNull: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) return data;
  for (const key of UNIQUE_KEYS) {
    if (data[key] === "") data[key] = null;
  }
  return data;
};
