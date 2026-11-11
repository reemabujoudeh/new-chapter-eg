import { LanguageToggle } from "@/components/hero/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import { CHAPTERS, SECTION_IDS, pad2 } from "./chapters";
import { prefersReducedMotion, scrollToId, useActiveSection } from "./motion";

/** Fixed top bar (logo + AR | EN) and side chapter indicator; both appear once the hero is left behind. */
export function DocChrome() {
  const active = useActiveSection(SECTION_IDS);
  const shown = active >= 0;
  return (
    <>
      <TopBar shown={shown} />
      <ChapterIndicator active={active} shown={shown} />
    </>
  );
}

function TopBar({ shown }: { shown: boolean }) {
  const { t } = useLanguage();
  return (
    <div
      inert={!shown}
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-border bg-background/70 backdrop-blur-md transition-all duration-500",
        shown ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div dir="ltr" className="flex h-14 items-center justify-between px-5 md:h-16 md:px-8">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" })}
          aria-label={t.nav.backToTop}
          className="grid h-9 w-9 place-items-center bg-brand-red font-logo text-2xl font-bold leading-none text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          R
        </button>
        <LanguageToggle />
      </div>
    </div>
  );
}

function ChapterIndicator({ active, shown }: { active: number; shown: boolean }) {
  const { t } = useLanguage();
  const current = Math.min(Math.max(active, 0), CHAPTERS.length - 1) + 1;
  const total = CHAPTERS.length;

  return (
    <nav
      aria-label={t.nav.progress}
      inert={!shown}
      className={cn(
        "fixed end-1.5 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-3 transition-opacity duration-500 md:end-7",
        shown ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <p dir="ltr" className="flex flex-col items-center font-label leading-none" aria-live="polite">
        <span className="text-sm font-bold text-neon md:text-xl">{pad2(current)}</span>
        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.15em] text-foreground/50 md:text-[0.7rem]">
          / {pad2(total)}
        </span>
      </p>
      <ol className="flex flex-col items-center">
        {CHAPTERS.map((c, i) => {
          const isActive = active === i;
          const passed = active > i;
          const title = t[c.key].title;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => scrollToId(c.id)}
                aria-label={`${t.nav.goTo} ${pad2(i + 1)}: ${title}`}
                aria-current={isActive ? "step" : undefined}
                title={title}
                className="group grid w-6 place-items-center rounded-sm py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:w-8"
              >
                <span
                  className={cn(
                    "block w-[3px] rounded-full transition-all duration-500",
                    isActive
                      ? "h-8 bg-neon neon-dot md:h-10"
                      : passed
                        ? "h-4 bg-neon/60 group-hover:bg-neon md:h-5"
                        : "h-4 bg-foreground/25 group-hover:bg-foreground/60 md:h-5",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
