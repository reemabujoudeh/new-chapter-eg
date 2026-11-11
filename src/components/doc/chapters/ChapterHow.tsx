import type { ReactNode } from "react";
import { Info } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHeader } from "../Chapter";
import { chapterDigits } from "../chapters";
import { Placeholder } from "../Placeholder";
import { Reveal } from "../Reveal";

export function ChapterHow() {
  const { t, lang } = useLanguage();
  const h = t.how;
  const ar = lang === "ar";
  const cardTitle = ar ? "font-bold text-neon" : "font-label text-xs font-semibold uppercase tracking-[0.22em] text-neon";
  const bigValue = ar ? "arabic-display text-5xl text-neon" : "headline-display text-4xl text-neon";

  return (
    <Chapter number={4}>
      <ChapterHeader number={4} chapterKey="how" />

      <div className="relative mt-16 md:mt-24">
        <span
          aria-hidden
          className="absolute bottom-0 top-2 start-[0.9rem] w-px bg-gradient-to-b from-neon via-violet to-transparent md:start-[1.35rem]"
        />
        <ol className="space-y-20 md:space-y-28">
          {/* 1. Academic structure */}
          <Part n={1} title={h.structure.title}>
            <Card>
              <p className={cardTitle}>{h.structure.grade1Title}</p>
              <p className="mt-3 text-lg text-foreground">{h.structure.grade1Text}</p>
              <Placeholder hint={h.structure.grade1Hint} className="mt-4" />
            </Card>
            <Card delay={120}>
              <p className={cardTitle}>{h.structure.grade23Title}</p>
              <p className="mt-3 text-lg text-foreground">{h.structure.grade23Text}</p>
            </Card>
          </Part>

          {/* 2. Study subjects */}
          <Part n={2} title={h.subjects.title}>
            <Card>
              <p className={cardTitle}>{h.subjects.coreTitle}</p>
              <span className="mt-3 inline-block rounded-full border border-neon/50 px-3 py-0.5 text-xs text-neon">{h.subjects.coreTag}</span>
              <ul className="mt-4 space-y-2">
                {h.subjects.core.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-lg text-foreground">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-neon" />
                    {s}
                  </li>
                ))}
              </ul>
            </Card>
            <Card delay={120}>
              <p className={cardTitle}>{h.subjects.notCountedTitle}</p>
              <ul className="mt-4 space-y-2">
                {h.subjects.notCounted.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-lg text-foreground/85">
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                    {s}
                  </li>
                ))}
              </ul>
            </Card>
            <Card wide>
              <p className={cardTitle}>{h.subjects.tracksTitle}</p>
              <p className="mt-2 text-muted-foreground">{h.subjects.tracksText}</p>
              <TrackGrid
                tracks={h.subjects.tracks.map((tr) => ({ name: tr.name, subjects: tr.grade2 }))}
                joiner={` ${h.subjects.or} `}
              />
            </Card>
            <Card wide>
              <p className={cardTitle}>{h.subjects.grade3Title}</p>
              <TrackGrid tracks={h.subjects.tracks.map((tr) => ({ name: tr.name, subjects: tr.grade3 }))} joiner=" + " />
            </Card>
            <Card wide neon>
              <p className={cardTitle}>{h.subjects.religionTitle}</p>
              <p className="mt-3 text-lg text-foreground">{h.subjects.religionText}</p>
            </Card>
          </Part>

          {/* 3. Assessment */}
          <Part n={3} title={h.assessment.title}>
            {h.assessment.items.map((item, i) => (
              <Card key={item.label} delay={(i % 2) * 120} wide={i === h.assessment.items.length - 1}>
                <p className={bigValue}>{item.value}</p>
                <p className={cn("mt-4", cardTitle)}>{item.label}</p>
                <p className="mt-2 text-lg leading-relaxed text-foreground">{item.text}</p>
              </Card>
            ))}
          </Part>

          {/* 4. Examination opportunities */}
          <Part n={4} title={h.exams.title}>
            {h.exams.grades.map((g, gi) => (
              <Card key={g.name} delay={gi * 120}>
                <p className={cardTitle}>{g.name}</p>
                <ol className="mt-5 space-y-4">
                  {g.attempts.map((a, ai) => (
                    <li key={a.label} className={cn("flex items-start gap-4", ai > 0 && "border-t border-border pt-4")}>
                      <span
                        className={cn(
                          "w-24 shrink-0 text-foreground",
                          ar ? "arabic-display text-2xl" : "headline-display text-lg",
                        )}
                      >
                        {a.month}
                      </span>
                      <span>
                        <span className="block font-semibold text-foreground">{a.label}</span>
                        <span className={cn("block text-sm", ai === 0 ? "text-neon" : "text-muted-foreground")}>{a.detail}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Card>
            ))}
            <Card>
              <p className="text-lg leading-relaxed text-foreground">{h.exams.years}</p>
            </Card>
            <Card delay={120}>
              <p className="text-lg leading-relaxed text-foreground">{h.exams.trackChange}</p>
            </Card>
          </Part>
        </ol>
      </div>

      <Reveal as="p" className="mt-20 flex max-w-3xl items-start gap-3 text-sm leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-neon" aria-hidden />
        {h.note}
      </Reveal>
    </Chapter>
  );
}

function Part({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  const { lang } = useLanguage();
  return (
    <li className="relative ps-11 md:ps-20">
      <Reveal
        variant="zoom"
        className="absolute start-0 top-0 grid h-[1.85rem] w-[1.85rem] place-items-center rounded-full border border-neon bg-background font-label text-[0.7rem] font-bold text-neon neon-dot md:h-11 md:w-11 md:text-sm"
      >
        {chapterDigits(n, lang)}
      </Reveal>
      <Reveal
        as="h3"
        variant="start"
        className={cn(
          "text-foreground",
          lang === "ar" ? "arabic-display text-3xl md:text-5xl" : "headline-display text-xl md:text-3xl",
        )}
      >
        {title}
      </Reveal>
      <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">{children}</div>
    </li>
  );
}

function Card({ children, wide, neon, delay = 0 }: { children: ReactNode; wide?: boolean; neon?: boolean; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn("glass-card p-5 md:p-7", wide && "md:col-span-2", neon && "glass-card-neon")}>
      {children}
    </Reveal>
  );
}

function TrackGrid({ tracks, joiner }: { tracks: { name: string; subjects: string[] }[]; joiner: string }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
      {tracks.map((tr) => (
        <li key={tr.name} className="rounded-md border border-border bg-background/40 p-4">
          <p className="font-semibold text-foreground">{tr.name}</p>
          <p className="mt-1.5 text-muted-foreground">
            {tr.subjects.map((s, i) => (
              <span key={s}>
                {i > 0 && <span className="text-neon">{joiner}</span>}
                {s}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ul>
  );
}
