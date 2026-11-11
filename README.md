# New Chapter Eg

Build the HERO section of a bilingual (Arabic default / English) cinematic scrollytelling documentary website "A New Chapter in Egyptian Education". Recreate the attached design as closely as possible, using the attached assets (student PNG with transparent background, cyber helmet background image).

DESIGN SYSTEM
- Background: pure black #000000 with the attached helmet image as a full-bleed background, dark gradient overlay so text stays readable, subtle purple glow.
- Colors: white #FFFFFF, neon green #55E02F (replace with the exact hex from my design), purple tones from the background image, red #C8102E only for the small "R" logo.
- Fonts: wide extended sans-serif (Syncopate or Unbounded) for English headings, Cairo (weight 800-900) for Arabic headings with stretched letters like in the design, Montserrat for small spaced text.

DESKTOP LAYOUT (1440px, full viewport height)
- Top-left: small red square "R" logo. Top-right: AR | EN language toggle.
- Huge headline "A NEW" on the first line and "CHAPTER" on the second, white, very large (about 14vw), light weight, spanning almost the full width, placed BEHIND the student.
- Student PNG centered, in FRONT of the headline, slightly lower so it only covers the bottom part of the letters and the full headline stays readable.
- Green rounded sticker badge "REEM 26'" rotated slightly, placed top-right of the headline, not overlapping the letters.
- Bottom-left: "IN" white, "EGYPTIAN" green, "EDUCATION" white, stacked.
- Bottom-right: Arabic "فصل" white, "جديد" green with stretched letters, "في التعليم المصري" white, right-aligned, RTL.
- Bottom-center: "EXPLORE THE STORY" with wide letter spacing and a small animated arrow; clicking it smooth-scrolls to Chapter 1.

MOBILE LAYOUT (390px)
- Same elements stacked in one column: logo and language toggle on top, headline "A NEW / CHAPTER" in two large lines (about 18vw) behind the student, student centered below the headline, then the Arabic block and the English "IN EGYPTIAN EDUCATION" block side by side or stacked with the same colors, then "EXPLORE THE STORY" at the bottom. Keep 24px side padding. Nothing may overflow horizontally.

ANIMATIONS
- Background: slow zoom (Ken Burns) and slight parallax on scroll.
- Headline letters fade/slide in on load; student fades up; helmet glow pulses subtly; scroll arrow bounces.
- Respect prefers-reduced-motion.

LANGUAGE
- Arabic is the default (dir="rtl"), English via the toggle (dir="ltr"). Put all text in translation files (ar.json / en.json). Remember the chosen language. Note: the hero design shows both languages together by design, so keep both visible and let the toggle control the rest of the site.
- Fully responsive, fast loading, optimized images.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/23a17ef7-b225-4beb-898d-bf6c93ab44f2).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
