# Famora

Eine ruhige Schritt-für-Schritt-Begleitung für Hinterbliebene nach einem Todesfall.

Nach einem Todesfall warten Behörden, Fristen und Verträge – meist mitten in der Trauer. Famora
ersetzt die Suche in Merkblättern und Foren durch eine persönliche Liste: ein kurzes Onboarding
fragt Situation, Zeitpunkt und was schon erledigt ist, daraus entsteht eine Übersicht mit dem, was
jetzt wirklich ansteht. Wer vorsorgen möchte, statt akut zu regeln, bekommt einen eigenen Pfad.

> Status: MVP mit lokalem State. Noch keine Persistenz, kein Backend, keine Auth.

## Screens

| Route         | Inhalt                                                                          |
| ------------- | ------------------------------------------------------------------------------- |
| `/`           | Landing Page – der "Faden" führt als Linie durch Problem, Ablauf und Vertrauen   |
| `/start`      | Onboarding – eine Frage pro Screen, verzweigt in Todesfall- oder Vorsorge-Pfad   |
| `/uebersicht` | Dashboard – Fortschrittsring, Werkzeuge und aufklappbare Aufgaben-Sektionen      |

## Tech-Stack

- **React 19** + **TypeScript** (strict)
- **Vite 8** als Build-Tool
- **Tailwind CSS v4** – Design-Tokens als `@theme` in `src/index.css`, keine Config-Datei
- **React Router 7**
- **Oxlint** als Linter
- **lucide-react** für Icons

## Setup

```bash
npm install
npm run dev      # http://localhost:5173
```

Weitere Skripte:

```bash
npm run build    # tsc -b && vite build
npm run preview  # gebautes dist/ lokal servieren
npm run lint     # oxlint
```

## Projektstruktur

Feature-basiert, nicht typ-basiert. Alles zu einem Feature liegt in einem Ordner.

```
src/
├── app.tsx                  # Shell mit <Outlet />
├── main.tsx                 # Router-Setup
├── routes.constants.ts      # Pfade zentral, keine Strings im JSX
├── index.css                # Design-Tokens (@theme) + globale Basis-Styles
├── components/              # Feature-übergreifend: button, progress-ring, sticky-cta, thread-section
└── features/
    ├── landing/             # hero, paths, steps, trust
    ├── onboarding/          # Fragen als Daten + useOnboarding als State-Maschine
    ├── dashboard/           # Aufgaben-Daten + useDashboard
    └── not-found/
```

Zwei Konventionen halten das Ganze zusammen:

**Fragen und Aufgaben sind Daten, kein JSX.** Eine neue Onboarding-Frage ist ein Eintrag in
`onboarding.questions.ts` – inklusive Verzweigung über `showIf` und Regeln wie `exclusive`, das eine
Option der Mehrfachauswahl mit allen anderen unvereinbar macht. Keine Komponente muss dafür
angefasst werden.

**State-Logik steckt in Hooks, Komponenten sind Darstellung.** `useOnboarding` weiß, welche Frage
sichtbar ist und ob weitergeklickt werden darf; `useDashboard` leitet den Fortschritt aus den
abgehakten Aufgaben ab. Die Komponenten bekommen fertige Werte.

## Design-System

Warm gebrochenes Weiß statt Reinweiß, gedämpftes Waldgrün als Primärfarbe, Serifen-Headlines
(Fraunces) gegen serifenlose Fließtexte (Source Sans 3). Bewusst kein klinisches Behörden-Grau und
kein aufgeräumtes SaaS-Blau – die Situation ist keine Produktivitäts-Aufgabe.

Alle Tokens stehen in `src/index.css`. Tailwind v4 erzeugt daraus automatisch die Utilities:
`--color-primary` wird zu `bg-primary`, `text-primary`, `border-primary`.

Mobile-first, `prefers-reduced-motion` wird respektiert.

## Lizenz

Privates Projekt, keine Lizenz vergeben.
