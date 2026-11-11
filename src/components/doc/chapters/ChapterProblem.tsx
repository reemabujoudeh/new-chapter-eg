import { useRef, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import deskImg from "@/assets/ch2-desk-scene.webp";
import { Chapter, ChapterHeader } from "../Chapter";
import { chapterDigits } from "../chapters";
import { useReducedMotion, useScrollProgress } from "../motion";

export function ChapterProblem() {
  const { t, lang } = useLanguage();
  const phrases = t.problem.phrases;
  const trackRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  // Pinned scene: each phrase lights up as the reader scrolls through the track.
  useScrollProgress(
    trackRef,
    (p) => {
      sceneRef.current?.style.setProperty("--p", reduced ? "0" : p.toFixed(3));
      const next = Math.min(phrases.length, Math.ceil(p * (phrases.length + 1)));
      setCount((c) => (c === next ? c : next));
    },
    "sticky",
  );
  const shownCount = reduced ? phrases.length : count;

  return (
    <Chapter
      number={2}
      innerClassName="pb-10 md:pb-16"
      after={
        <div ref={trackRef} className="relative h-[300svh]">
          <div ref={sceneRef} className="sticky top-0 h-svh overflow-hidden" style={{ "--p": "0" } as React.CSSProperties}>
            <img
              src={deskImg}
              alt={t.problem.sceneAlt}
              width={1600}
              height={907}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-70 [scale:calc(1.04+var(--p)*0.14)]"
            />
            <div aria-hidden className="absolute inset-0 -z-10 scene-overlay" />
            <div className="chapter-pad relative flex h-full flex-col justify-center">
              <ol className="max-w-3xl space-y-6 md:space-y-8">
                {phrases.map((phrase, i) => {
                  const on = i < shownCount;
                  const latest = i === shownCount - 1;
                  return (
                    <li
                      key={phrase}
                      className={cn(
                        "flex items-baseline gap-4 transition-all duration-700 ease-out md:gap-6",
                        on ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-sm",
                      )}
                    >
                      <span className={cn("shrink-0 font-label text-xs font-bold tracking-[0.2em] md:text-sm", latest ? "text-neon" : "text-neon/50")}>
                        {chapterDigits(i + 1, lang)}
                      </span>
                      <span
                        className={cn(
                          "text-balance transition-colors duration-700",
                          lang === "ar"
                            ? "font-arabic text-[clamp(1.5rem,4.4vw,3.25rem)] font-extrabold leading-snug"
                            : "font-label text-[clamp(1.3rem,3.4vw,2.6rem)] font-semibold leading-tight",
                          latest ? "text-foreground" : "text-foreground/55",
                        )}
                      >
                        {phrase}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      }
    >
      <ChapterHeader number={2} chapterKey="problem" />
    </Chapter>
  );
}
