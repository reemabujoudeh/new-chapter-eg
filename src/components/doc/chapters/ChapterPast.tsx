import { MoveHorizontal } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHeader } from "../Chapter";
import { chapterDigits } from "../chapters";
import { Placeholder } from "../Placeholder";
import { Reveal } from "../Reveal";

const MILESTONES = 5;

export function ChapterPast() {
  const { t, lang } = useLanguage();
  return (
    <Chapter number={1}>
      <ChapterHeader number={1} chapterKey="past" />

      <Reveal className="mt-16 md:mt-20">
        <p className={cn("mb-4 flex items-center gap-2 text-xs text-muted-foreground", lang === "en" && "font-label uppercase tracking-[0.25em]")}>
          <MoveHorizontal className="h-4 w-4 text-neon" aria-hidden />
          {t.past.scrollHint}
        </p>
        <div
          role="region"
          aria-label={t.past.timelineLabel}
          tabIndex={0}
          className="thin-scrollbar -mx-2 overflow-x-auto px-2 pb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ol className="relative flex w-max gap-5 pt-2 md:gap-7">
            <span aria-hidden className="absolute inset-x-0 top-[0.95rem] h-px bg-gradient-to-r from-neon via-violet to-transparent rtl:bg-gradient-to-l" />
            {Array.from({ length: MILESTONES }, (_, i) => (
              <li key={i} className="relative w-[250px] shrink-0 md:w-[300px]">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="relative z-10 h-3 w-3 rounded-full bg-neon neon-dot" />
                  <span className={cn("text-xs text-neon", lang === "ar" ? "font-arabic font-bold" : "font-label font-semibold uppercase tracking-[0.3em]")}>
                    {t.past.milestone} {chapterDigits(i + 1, lang)}
                  </span>
                </div>
                <Reveal delay={i * 120} className="glass-card mt-6 flex min-h-[220px] flex-col justify-between p-5 md:p-6">
                  <p aria-hidden className="headline-display text-4xl text-foreground/15">
                    ····
                  </p>
                  <Placeholder hint={t.past.hint} className="mt-6" />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </Chapter>
  );
}
