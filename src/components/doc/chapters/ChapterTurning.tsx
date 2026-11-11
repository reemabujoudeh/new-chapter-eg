import { useRef } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHeader } from "../Chapter";
import { useReducedMotion, useScrollProgress } from "../motion";
import { Placeholder } from "../Placeholder";
import { Reveal } from "../Reveal";

/** Darkness to light: a violet/green dawn rises behind the chapter as the reader scrolls in. */
export function ChapterTurning() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useScrollProgress(
    sectionRef,
    (p) => {
      sectionRef.current?.style.setProperty("--dawn", reduced ? "1" : Math.min(1, p * 1.25).toFixed(3));
    },
    "through",
  );

  return (
    <Chapter number={3} sectionRef={sectionRef} className="min-h-[140svh]" innerClassName="md:pb-44">
      <div aria-hidden className="absolute inset-0 -z-10 dawn-glow opacity-[var(--dawn,0)]" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-[18%] -z-10 h-px origin-center bg-gradient-to-r from-transparent via-neon to-transparent [transform:scaleX(var(--dawn,0))]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-background to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 bg-gradient-to-t from-background to-transparent" />

      <ChapterHeader number={3} chapterKey="turning" />

      <ul className="mt-16 grid gap-5 md:mt-20 md:grid-cols-3">
        {t.turning.facts.map((fact, i) => (
          <Reveal as="li" key={fact.label} delay={i * 140} className="glass-card glass-card-neon p-6 md:p-7">
            <p
              className={cn(
                "text-neon",
                lang === "ar" ? "arabic-display text-5xl" : "headline-display text-[clamp(2rem,3.4vw,2.75rem)]",
              )}
            >
              {fact.value}
            </p>
            <p className={cn("mt-5 text-foreground", lang === "ar" ? "font-bold" : "font-semibold uppercase tracking-[0.12em] text-sm")}>
              {fact.label}
            </p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{fact.text}</p>
          </Reveal>
        ))}
      </ul>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        {[t.turning.goals, t.turning.philosophy].map((title, i) => (
          <Reveal key={title} delay={i * 140} className="glass-card p-6 md:p-7">
            <h3 className={cn("text-lg text-foreground", lang === "ar" ? "font-bold" : "font-semibold uppercase tracking-[0.12em]")}>
              {title}
            </h3>
            <Placeholder hint={t.turning.hint} className="mt-4" />
          </Reveal>
        ))}
      </div>
    </Chapter>
  );
}
