import { describe, expect, it } from "vitest";
import { DEFAULT_LANG, dictionaries } from "@/i18n/LanguageProvider";

function keys(obj: unknown, prefix = ""): string[] {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) return [prefix];
  return Object.entries(obj).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k));
}

describe("i18n", () => {
  it("defaults to Arabic", () => {
    expect(DEFAULT_LANG).toBe("ar");
  });

  it("has the same text keys in Arabic and English", () => {
    expect(keys(dictionaries.ar).sort()).toEqual(keys(dictionaries.en).sort());
  });
});
