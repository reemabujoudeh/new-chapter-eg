import { useLanguage, type Lang } from "@/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "ar", label: "AR" },
  { value: "en", label: "EN" },
];

export function LanguageToggle() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      dir="ltr"
      className="flex items-center gap-1 font-label text-xs font-semibold tracking-[0.3em] md:text-sm"
    >
      {OPTIONS.map((opt, i) => (
        <div key={opt.value} className="flex items-center">
          {i > 0 && <span aria-hidden className="mx-2 text-foreground/40">|</span>}
          <button
            type="button"
            onClick={() => setLang(opt.value)}
            aria-pressed={lang === opt.value}
            aria-label={opt.value === "ar" ? t.nav.arabic : t.nav.english}
            className={cn(
              "relative py-1 pl-[0.3em] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm",
              lang === opt.value ? "text-foreground" : "text-foreground/45 hover:text-foreground/80",
            )}
          >
            {opt.label}
            <span
              aria-hidden
              className={cn(
                "absolute inset-x-[0.3em] -bottom-0.5 h-0.5 origin-left bg-neon transition-transform duration-500",
                lang === opt.value ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
