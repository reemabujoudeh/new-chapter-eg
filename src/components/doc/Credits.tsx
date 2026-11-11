import { useState } from "react";
import { ArrowUp, Pause, Play } from "lucide-react";
import { dictionaries, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { CREDITS_ID } from "./chapters";
import { prefersReducedMotion } from "./motion";
import { TbaText } from "./Placeholder";
import { Reveal } from "./Reveal";

function CreditsList({ copy }: { copy?: boolean }) {
  const { t, lang } = useLanguage();
  const ar = lang === "ar";
  return (
    <div aria-hidden={copy || undefined} className={cn("space-y-14 pb-24 text-center", copy && "motion-reduce:hidden")}>
      <p className={cn("text-foreground", ar ? "arabic-display text-3xl md:text-4xl" : "headline-display text-lg md:text-2xl")}>
        {t.credits.film}
      </p>
      {t.credits.items.map((item) => (
        <div key={item.role}>
          <p className={cn("text-neon", ar ? "font-bold" : "font-label text-xs font-semibold uppercase tracking-[0.35em]")}>
            {item.role}
          </p>
          {item.lines.map((line) => (
            <p key={line} className={cn("mt-3 text-foreground", ar ? "text-xl font-bold md:text-2xl" : "text-lg font-medium md:text-xl")}>
              <TbaText text={line} />
            </p>
          ))}
        </div>
      ))}
      <div className="flex flex-col items-center gap-5">
        <span aria-hidden className="grid h-12 w-12 place-items-center bg-brand-red font-logo text-3xl font-bold leading-none text-foreground">
          R
        </span>
        <p className="text-sm text-muted-foreground">{t.credits.updated}</p>
      </div>
    </div>
  );
}

export function Credits() {
  const { t, lang } = useLanguage();
  const [paused, setPaused] = useState(false);
  const ar = lang === "ar";

  return (
    <section
      id={CREDITS_ID}
      aria-labelledby="credits-title"
      className="relative isolate flex min-h-svh flex-col items-center overflow-x-clip bg-background px-6 pb-16 pt-28"
    >
      <div aria-hidden className="absolute inset-0 -z-10 violet-glow opacity-60" />

      <h2 id="credits-title" className="flex flex-col items-center gap-3 text-center">
        <Reveal as="span" lang="en" dir="ltr" className={cn("block headline-display text-[clamp(1.8rem,5vw,3.5rem)]", ar ? "order-2 text-neon" : "order-1")}>
          {dictionaries.en.credits.title}
        </Reveal>
        <Reveal as="span" lang="ar" dir="rtl" delay={120} className={cn("block arabic-display text-[clamp(2.2rem,6vw,4.25rem)]", ar ? "order-1" : "order-2 text-neon")}>
          {dictionaries.ar.credits.title}
        </Reveal>
      </h2>

      <div className="group relative mt-12 h-[62svh] w-full max-w-2xl overflow-hidden edge-fade-y motion-reduce:overflow-y-auto">
        <div
          className={cn(
            "animate-credits-roll group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none",
            paused && "[animation-play-state:paused]",
          )}
        >
          <div className="h-[30svh]" aria-hidden />
          <CreditsList />
          <div className="h-[30svh] motion-reduce:hidden" aria-hidden />
          <CreditsList copy />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="flex items-center gap-2 rounded-sm text-sm text-foreground/80 transition-colors hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hidden"
        >
          {paused ? <Play className="h-4 w-4" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
          {paused ? t.credits.play : t.credits.pause}
        </button>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
          className="flex items-center gap-2 rounded-sm text-sm text-foreground/80 transition-colors hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowUp className="h-4 w-4 text-neon" aria-hidden />
          {t.nav.backToTop}
        </button>
      </div>
    </section>
  );
}
