import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { dictionaries, useLanguage } from "@/i18n/LanguageProvider";
import { LanguageToggle } from "./LanguageToggle";
import studentImg from "@/assets/student.webp";
import helmetAsset from "@/assets/cyber-helmet.webp.asset.json";

// The hero artwork shows both languages by design: English headline + tagline,
// Arabic tagline. Only UI labels (toggle, explore, alt text) follow the chosen language.
const EN = dictionaries.en.hero;
const AR = dictionaries.ar.hero;

function AnimatedWord({ text, startDelay }: { text: string; startDelay: number }) {
  return (
    <span aria-hidden className="block">
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          className="inline-block animate-letter-in"
          style={{ animationDelay: `${startDelay + i * 70}ms` }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

export function Hero({ nextSectionId }: { nextSectionId: string }) {
  const { t, dir } = useLanguage();
  const bgRef = useRef<HTMLDivElement>(null);

  // Gentle parallax on the background while scrolling out of the hero.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, window.innerHeight * 1.2);
        if (bgRef.current) bgRef.current.style.transform = `translate3d(0, ${y * 0.35}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToNext = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document
      .getElementById(nextSectionId)
      ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section
      dir="ltr"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-background px-6 pb-8 pt-6 md:block md:h-svh md:min-h-[640px] md:p-0"
    >
      {/* Background: helmet artwork with Ken Burns + parallax */}
      <div ref={bgRef} className="absolute -inset-y-[10%] inset-x-0 -z-30 will-change-transform">
        <img
          src={helmetAsset.url}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="h-full w-full animate-ken-burns object-cover object-[62%_30%] opacity-80"
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-20 violet-glow animate-glow-pulse" />
      <div aria-hidden className="absolute inset-0 -z-10 hero-overlay" />

      {/* Top bar */}
      <header className="relative z-40 flex items-center justify-between md:absolute md:inset-x-0 md:top-0 md:px-8 md:pt-7">
        <a
          href="/"
          aria-label={t.nav.home}
          className="grid h-11 w-11 place-items-center bg-brand-red font-logo text-3xl font-bold leading-none text-foreground animate-fade-in md:h-12 md:w-12"
        >
          R
        </a>
        <LanguageToggle />
      </header>

      {/* Headline (behind the student) */}
      <div className="relative z-10 mt-14 flex justify-center md:absolute md:inset-x-0 md:top-[12%] md:mt-0">
        <h1
          id="hero-title"
          lang="en"
          className="relative whitespace-nowrap text-center headline-display text-foreground text-[min(14.6vw,6.8rem)] md:text-[min(12.4vw,20.5vh)]"
        >
          <span className="sr-only">{EN.title.join(" ")}</span>
          <AnimatedWord text={EN.title[0] ?? ""} startDelay={150} />
          <AnimatedWord text={EN.title[1] ?? ""} startDelay={150 + (EN.title[0]?.length ?? 0) * 70} />

          {/* REEM 26' sticker, top-right of the headline */}
          <span
            role="img"
            aria-label={`${EN.badge} ${EN.badgeYear}`}
            className="absolute right-0 top-[-0.36em] block animate-sticker-pop text-[0.2em] md:right-[0.02em] md:top-[0.1em]"
            style={{ animationDelay: "1300ms" }}
          >
            <span className="absolute -right-[0.1em] -top-[0.95em] font-marker text-[0.7em] italic leading-none text-neon">
              {EN.badgeYear}
            </span>
            <span className="block rounded-full bg-neon px-[0.55em] pb-[0.08em] pt-[0.14em] font-marker text-[1em] leading-none tracking-[0.04em] text-neon-foreground sticker-shadow">
              {EN.badge}
            </span>
          </span>
        </h1>
      </div>

      {/* Student, in front of the headline */}
      <div className="relative z-20 -mt-[7vw] flex justify-center md:absolute md:inset-x-0 md:bottom-[2%] md:mt-0 md:h-[62%]">
        <img
          src={studentImg}
          alt={t.hero.studentAlt}
          width={613}
          height={975}
          decoding="async"
          fetchPriority="high"
          className="h-auto w-[78vw] max-w-[360px] student-fade animate-fade-up md:h-full md:w-auto md:max-w-none"
          style={{ animationDelay: "500ms" }}
        />
      </div>

      {/* Taglines */}
      <div className="relative z-30 -mt-24 grid grid-cols-2 items-end gap-4 md:contents">
        <p
          lang="en"
          aria-label={EN.tagline.join(" ")}
          className="headline-display text-[min(5.2vw,1.5rem)] leading-[1.12] tracking-normal md:absolute md:bottom-[17%] md:left-[8%] md:text-[min(3vw,5.2vh)]"
        >
          {EN.tagline.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className={`block animate-fade-up ${i === 1 ? "text-neon" : "text-foreground"}`}
              style={{ animationDelay: `${1100 + i * 140}ms` }}
            >
              {line}
            </span>
          ))}
        </p>

        <p
          lang="ar"
          dir="rtl"
          aria-label={AR.taglineAria}
          className="text-right arabic-display md:absolute md:bottom-[15%] md:right-[8%]"
        >
          {AR.tagline.map((line, i) => (
            <span
              key={line}
              aria-hidden
              className={`block animate-fade-up ${
                i === 1 ? "text-neon" : "text-foreground"
              } ${
                i < 2
                  ? "text-[min(11vw,3rem)] md:text-[min(5.4vw,9.5vh)]"
                  : "mt-1 whitespace-nowrap text-[min(3.9vw,1.25rem)] md:mt-2 md:text-[min(2.5vw,4.4vh)]"
              }`}
              style={{ animationDelay: `${1100 + i * 140}ms` }}
            >
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Explore the story */}
      <div className="relative z-30 mt-auto flex justify-center pt-10 md:absolute md:inset-x-0 md:bottom-6 md:mt-0 md:pt-0">
        <button
          type="button"
          onClick={scrollToNext}
          aria-label={t.hero.exploreAria}
          dir={dir}
          className="group flex flex-col items-center gap-2 rounded-sm text-[0.7rem] text-foreground/90 transition-colors hover:text-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring animate-fade-in md:text-sm"
          style={{ animationDelay: "1800ms" }}
        >
          <span className={dir === "rtl" ? "font-arabic text-sm font-bold tracking-[0.2em] md:text-base" : "text-spaced pl-[0.55em]"}>
            {t.hero.explore}
          </span>
          <ChevronDown className="h-5 w-5 text-neon animate-arrow-bounce" strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
