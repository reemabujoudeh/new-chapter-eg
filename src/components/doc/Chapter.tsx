import { useRef, type ReactNode, type Ref } from "react";
import { dictionaries, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { chapterDigits, pad2, type ChapterKey } from "./chapters";
import { useReducedMotion, useScrollProgress } from "./motion";
import { Reveal } from "./Reveal";

type ChapterProps = {
  number: number;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  /** Full-bleed content rendered after the padded column (e.g. sticky scenes). */
  after?: ReactNode;
  sectionRef?: Ref<HTMLElement>;
};

/** Full-screen chapter shell with soft black fades top and bottom for cinematic cuts. */
export function Chapter({ number, className, innerClassName, children, after, sectionRef }: ChapterProps) {
  return (
    <section
      id={`chapter-${number}`}
      ref={sectionRef}
      aria-labelledby={`chapter-${number}-title`}
      className={cn("relative isolate min-h-svh overflow-x-clip bg-background", className)}
    >
      <div className={cn("chapter-pad relative py-24 md:py-32", innerClassName)}>{children}</div>
      {after}
    </section>
  );
}

/**
 * Big outlined chapter number, English + Arabic titles (both always shown, active language first),
 * then subtitle and intro in the active language.
 */
export function ChapterHeader({ number, chapterKey, className }: { number: number; chapterKey: ChapterKey; className?: string }) {
  const { lang, t } = useLanguage();
  const numberRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useScrollProgress(
    headerRef,
    (p) => {
      if (!numberRef.current) return;
      numberRef.current.style.transform = reduced ? "" : `translate3d(0, ${(p - 0.5) * -90}px, 0)`;
    },
    "pass",
  );

  const align = lang === "ar" ? "text-right" : "text-left";
  const copy = t[chapterKey];
  const en = dictionaries.en[chapterKey].title;
  const ar = dictionaries.ar[chapterKey].title;

  return (
    <header ref={headerRef} className={cn("relative", className)}>
      <div
        ref={numberRef}
        aria-hidden
        className="chapter-number pointer-events-none select-none text-[clamp(6.5rem,24vw,15rem)] will-change-transform"
      >
        {pad2(number)}
      </div>

      <Reveal as="p" className={cn("mt-4 text-neon", lang === "ar" ? "font-arabic text-sm font-bold tracking-[0.15em]" : "text-spaced text-xs")}>
        {t.common.chapter} {chapterDigits(number, lang)}
      </Reveal>

      <h2 id={`chapter-${number}-title`} className="mt-4 flex flex-col gap-2 md:gap-3">
        <Reveal
          as="span"
          lang="en"
          dir="ltr"
          delay={80}
          className={cn(
            "block headline-display text-balance text-[clamp(1.7rem,6.2vw,5rem)]",
            align,
            lang === "en" ? "order-1 text-foreground" : "order-2 text-neon",
          )}
        >
          {en}
        </Reveal>
        <Reveal
          as="span"
          lang="ar"
          dir="rtl"
          delay={160}
          className={cn(
            "block arabic-display text-balance text-[clamp(2.3rem,7.4vw,5.75rem)]",
            align,
            lang === "ar" ? "order-1 text-foreground" : "order-2 text-neon",
          )}
        >
          {ar}
        </Reveal>
      </h2>

      <Reveal delay={240} className="mt-8 flex max-w-2xl items-start gap-4">
        <span aria-hidden className="mt-3 h-px w-10 shrink-0 bg-neon" />
        <div>
          <p className={cn("text-lg text-foreground md:text-xl", lang === "ar" ? "font-bold" : "font-semibold")}>{copy.subtitle}</p>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{copy.intro}</p>
        </div>
      </Reveal>
    </header>
  );
}
