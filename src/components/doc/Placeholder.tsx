import { useLanguage } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export const TBA = "{TBA}";

/** Clearly marked slot for content the author will add later. */
export function Placeholder({ hint, className }: { hint?: string; className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={cn("placeholder-block px-4 py-3", className)}>
      <span className="font-label text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-neon">
        {t.common.placeholder}
      </span>
      <p className="mt-1.5 font-semibold text-foreground/85">{t.common.toBeAdded}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

/** Renders a line of text, swapping any {TBA} token for a marked placeholder label. */
export function TbaText({ text }: { text: string }) {
  const { t } = useLanguage();
  if (!text.includes(TBA)) return <>{text}</>;
  const [before, after] = text.split(TBA);
  return (
    <>
      {before}
      <mark className="rounded-sm border border-dashed border-neon/60 bg-neon/10 px-1.5 text-neon">
        {t.common.toBeAdded}
      </mark>
      {after}
    </>
  );
}
