import { Info } from "lucide-react";
import { dictionaries, useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import studentImg from "@/assets/ch6-student.webp";
import parentImg from "@/assets/ch6-parent.webp";
import teacherImg from "@/assets/ch6-teacher.webp";
import { Chapter, ChapterHeader } from "../Chapter";
import { Reveal } from "../Reveal";

const IMAGES = [studentImg, parentImg, teacherImg];

export function ChapterVoices() {
  const { t, lang } = useLanguage();
  const ar = lang === "ar";

  return (
    <Chapter number={6}>
      <ChapterHeader number={6} chapterKey="voices" />

      <ul className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3">
        {t.voices.cards.map((card, i) => (
          <Reveal as="li" key={card.role} variant="zoom" delay={i * 160}>
            <figure className="group glass-card relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
              <img
                src={IMAGES[i]}
                alt={card.alt}
                width={720}
                height={960}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-105"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className={cn("text-neon", ar ? "font-bold" : "font-label text-xs font-semibold uppercase tracking-[0.3em]")}>
                  {card.role}
                </p>
                <blockquote
                  className={cn(
                    "mt-3 text-foreground",
                    ar ? "text-xl font-bold leading-relaxed md:text-[1.35rem]" : "text-lg font-medium leading-snug",
                  )}
                >
                  {ar ? `«${card.quote}»` : `“${card.quote}”`}
                </blockquote>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>

      {/* Always shown in both languages, whatever the reader chose. */}
      <Reveal className="glass-card glass-card-neon mt-8 flex items-start gap-4 p-5 md:p-6">
        <Info className="mt-1 h-5 w-5 shrink-0 text-neon" aria-hidden />
        <div className="grid flex-1 gap-3 md:grid-cols-2 md:gap-8">
          <p lang="ar" dir="rtl" className="text-right font-arabic font-semibold leading-relaxed text-foreground">
            {dictionaries.ar.voices.disclaimer}
          </p>
          <p lang="en" dir="ltr" className={cn("font-label leading-relaxed text-foreground/85", ar ? "text-right" : "text-left")}>
            {dictionaries.en.voices.disclaimer}
          </p>
        </div>
      </Reveal>
    </Chapter>
  );
}
