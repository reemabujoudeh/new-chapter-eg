import { dictionaries, useLanguage, type Lang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHeader } from "../Chapter";
import { chapterDigits } from "../chapters";
import { Reveal } from "../Reveal";

/** Split the closing line at its first comma so the second half can glow. */
function splitClosing(text: string) {
  const m = text.match(/^(.*?[,،])\s*(.*)$/);
  return m ? [m[1] ?? text, m[2] ?? ""] : [text, ""];
}

export function ChapterFuture() {
  const { t, lang } = useLanguage();
  const ar = lang === "ar";
  const other: Lang = ar ? "en" : "ar";

  return (
    <Chapter number={7} innerClassName="pb-0 md:pb-0">
      <ChapterHeader number={7} chapterKey="future" />

      <ol className="mt-10">
        {t.future.questions.map((q, i) => (
          <li key={q} className="flex min-h-[48svh] items-center">
            <Reveal variant="start" className="flex max-w-4xl items-start gap-4 md:gap-8">
              <span className="mt-2 shrink-0 font-label text-xs font-bold tracking-[0.2em] text-neon md:mt-4 md:text-sm">
                {chapterDigits(i + 1, lang)}
              </span>
              <p
                className={cn(
                  "text-balance text-foreground",
                  ar
                    ? "font-arabic text-[clamp(1.75rem,5vw,4rem)] font-extrabold leading-snug"
                    : "font-label text-[clamp(1.5rem,4vw,3.25rem)] font-semibold leading-tight",
                )}
              >
                {q}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>

      <div className="flex min-h-svh flex-col items-center justify-center gap-8 py-24 text-center">
        <span aria-hidden className="h-16 w-px bg-gradient-to-b from-transparent to-neon" />
        <Reveal as="blockquote" variant="zoom" className="max-w-6xl">
          <ClosingLine lang={lang} big />
        </Reveal>
        <Reveal delay={300} className="max-w-3xl">
          <ClosingLine lang={other} />
        </Reveal>
      </div>
    </Chapter>
  );
}

function ClosingLine({ lang, big }: { lang: Lang; big?: boolean }) {
  const [first, second] = splitClosing(dictionaries[lang].future.closing);
  const ar = lang === "ar";
  return (
    <p
      lang={lang}
      dir={ar ? "rtl" : "ltr"}
      className={cn(
        "text-balance",
        ar ? "arabic-display" : "headline-display",
        big
          ? ar
            ? "text-[clamp(2rem,6vw,5rem)] leading-[1.25]"
            : "text-[clamp(1.35rem,4.2vw,3.9rem)] leading-[1.15]"
          : ar
            ? "text-xl text-foreground/70 md:text-3xl"
            : "text-xs text-foreground/70 md:text-base",
      )}
    >
      <span className={big ? "text-foreground" : undefined}>{first}</span>{" "}
      <span className={big ? "text-neon" : undefined}>{second}</span>
    </p>
  );
}
