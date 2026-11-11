import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero/Hero";
import { DocChrome } from "@/components/doc/DocChrome";
import { ChapterPast } from "@/components/doc/chapters/ChapterPast";
import { ChapterProblem } from "@/components/doc/chapters/ChapterProblem";
import { ChapterTurning } from "@/components/doc/chapters/ChapterTurning";
import { ChapterHow } from "@/components/doc/chapters/ChapterHow";
import { ChapterCompare } from "@/components/doc/chapters/ChapterCompare";
import { ChapterVoices } from "@/components/doc/chapters/ChapterVoices";
import { ChapterFuture } from "@/components/doc/chapters/ChapterFuture";
import { Credits } from "@/components/doc/Credits";
import ar from "@/i18n/ar.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "فصل جديد في التعليم المصري | A New Chapter in Egyptian Education" },
      { name: "description", content: ar.meta.description },
      { property: "og:title", content: "A New Chapter in Egyptian Education | فصل جديد في التعليم المصري" },
      {
        property: "og:description",
        content: "A cinematic scrollytelling documentary about the future of education in Egypt, in seven chapters.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <DocChrome />
      <main>
        <Hero nextSectionId="chapter-1" />
        <ChapterPast />
        <ChapterProblem />
        <ChapterTurning />
        <ChapterHow />
        <ChapterCompare />
        <ChapterVoices />
        <ChapterFuture />
        <Credits />
      </main>
    </>
  );
}
