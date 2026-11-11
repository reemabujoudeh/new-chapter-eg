import { describe, expect, it } from "vitest";
import { dictionaries, type Lang } from "@/i18n/LanguageProvider";
import { CHAPTERS } from "@/components/doc/chapters";

const LANGS: Lang[] = ["ar", "en"];
// Arabic text uses Arabic-Indic digits; compare facts as Western digits.
const western = (s: string) => s.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));

describe("documentary structure", () => {
  it("has seven chapters, each with a title in both languages", () => {
    expect(CHAPTERS).toHaveLength(7);
    for (const lang of LANGS) {
      for (const c of CHAPTERS) expect(dictionaries[lang][c.key].title.length).toBeGreaterThan(0);
    }
  });
});

describe.each(LANGS)("official facts (%s)", (lang) => {
  const how = dictionaries[lang].how;

  it("second exam attempts cost 200 EGP per subject; first attempts are free", () => {
    for (const grade of how.exams.grades) {
      expect(grade.attempts).toHaveLength(2);
      expect(western(grade.attempts[1]!.detail)).toContain("200");
      expect(western(grade.attempts[0]!.detail)).not.toContain("200");
    }
  });

  it("grades each subject out of 100 with a final total out of 600", () => {
    expect(western(how.assessment.items[0]!.value)).toBe("100");
    expect(western(how.assessment.items[1]!.value)).toBe("600");
  });

  it("requires 60% of assessments to sit the exam and 70% to pass Religious Education", () => {
    expect(western(how.assessment.items[4]!.value).replace("٪", "%")).toBe("60%");
    expect(western(how.subjects.religionText)).toContain("70");
  });

  it("dates the information to November 2026", () => {
    expect(western(how.note)).toContain("2026");
    expect(western(dictionaries[lang].credits.updated)).toContain("2026");
  });

  it("names Law No. 169 of 2025", () => {
    expect(western(dictionaries[lang].turning.intro)).toContain("169");
    expect(western(dictionaries[lang].turning.intro)).toContain("2025");
  });
});
