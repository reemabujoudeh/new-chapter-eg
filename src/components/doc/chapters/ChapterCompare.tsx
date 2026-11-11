import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHeader } from "../Chapter";
import { Placeholder } from "../Placeholder";
import { Reveal } from "../Reveal";

/** Split-screen comparison. Both systems get equal visual weight to keep the tone neutral. */
export function ChapterCompare() {
  const { t, lang } = useLanguage();
  const c = t.compare;
  const ar = lang === "ar";
  const grid = "grid grid-cols-2 md:grid-cols-[minmax(11rem,1fr)_2fr_2fr]";
  const colHead = ar
    ? "arabic-display text-xl md:text-3xl"
    : "font-label text-[0.8rem] font-bold uppercase leading-snug tracking-wider md:headline-display md:text-xl";

  return (
    <Chapter number={5}>
      <ChapterHeader number={5} chapterKey="compare" />

      <Reveal className="glass-card mt-16 overflow-hidden md:mt-20">
        <div role="table" aria-label={`${c.old} / ${c.new}`}>
          <div role="row" className={cn(grid, "border-b border-border")}>
            <span role="columnheader" className="hidden p-5 text-sm text-muted-foreground md:block md:p-6">
              {c.aspect}
            </span>
            <span role="columnheader" className={cn("border-b-2 border-violet bg-violet/10 p-4 text-foreground md:p-6", colHead)}>
              {c.old}
            </span>
            <span
              role="columnheader"
              className={cn("border-b-2 border-neon bg-neon/[0.06] border-s border-s-border p-4 text-foreground md:p-6", colHead)}
            >
              {c.new}
            </span>
          </div>

          {c.rows.map((row, i) => (
            <Reveal key={row} role="row" delay={i * 90} variant="fade" className={cn(grid, i > 0 && "border-t border-border")}>
              <span
                role="rowheader"
                className={cn(
                  "col-span-2 px-4 pt-5 text-foreground md:col-span-1 md:p-6",
                  ar ? "font-bold text-lg" : "font-label text-xs font-semibold uppercase tracking-[0.2em] md:text-sm",
                )}
              >
                {row}
              </span>
              <span role="cell" className="p-3 md:p-6">
                <Placeholder hint={c.hint} />
              </span>
              <span role="cell" className="border-s border-border p-3 md:p-6">
                <Placeholder hint={c.hint} />
              </span>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </Chapter>
  );
}
