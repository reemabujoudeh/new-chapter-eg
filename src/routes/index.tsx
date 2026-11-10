import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";
import { useLanguage } from "@/i18n/LanguageProvider";
import ar from "@/i18n/ar.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "فصل جديد في التعليم المصري | A New Chapter in Egyptian Education" },
      { name: "description", content: ar.meta.description },
      { property: "og:title", content: "A New Chapter in Egyptian Education | فصل جديد في التعليم المصري" },
      {
        property: "og:description",
        content: "A cinematic scrollytelling documentary about the future of education in Egypt.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero nextSectionId="chapter-1" />
      <ChapterOne />
    </main>
  );
}

function ChapterOne() {
  const { t, dir, lang } = useLanguage();
  return (
    <section
      id="chapter-1"
      dir={dir}
      lang={lang}
      className="relative flex min-h-svh scroll-mt-0 items-center bg-background px-6 py-24 md:px-[8%]"
    >
      <div className="max-w-3xl">
        <p className={lang === "ar" ? "font-arabic text-sm font-bold text-neon" : "text-spaced text-xs text-neon"}>
          {t.chapter1.eyebrow}
        </p>
        <h2
          className={
            lang === "ar"
              ? "mt-4 arabic-display text-5xl md:text-7xl"
              : "mt-4 headline-display text-4xl md:text-6xl"
          }
        >
          {t.chapter1.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{t.chapter1.body}</p>
      </div>
    </section>
  );
}
