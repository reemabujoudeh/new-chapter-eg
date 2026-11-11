import type { Lang } from "@/i18n/LanguageProvider";

/** Story order. Each key matches a chapter block in ar.json / en.json. */
export const CHAPTERS = [
  { id: "chapter-1", key: "past" },
  { id: "chapter-2", key: "problem" },
  { id: "chapter-3", key: "turning" },
  { id: "chapter-4", key: "how" },
  { id: "chapter-5", key: "compare" },
  { id: "chapter-6", key: "voices" },
  { id: "chapter-7", key: "future" },
] as const;

export type ChapterKey = (typeof CHAPTERS)[number]["key"];
export const CREDITS_ID = "credits";
export const SECTION_IDS = [...CHAPTERS.map((c) => c.id), CREDITS_ID] as const;

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Two-digit chapter number in the reader's digits (٠١ in Arabic, 01 in English). */
export function chapterDigits(n: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }).format(n);
}
