export type Locale = "en" | "de";

const translations = {
  en: {
    // Navbar
    appTitle: "Quiz-App",

    // Home
    homeHeading: "Quiz-App",
    homeSubheading: "Pick a topic and test your knowledge.",
    questionsCount: (n: number) => `${n} questions`,

    // Topic descriptions
    "topic.git.description":
      "Version control fundamentals — commits, branches, merging, and collaboration.",
    "topic.github-actions.description":
      "CI/CD pipelines — workflows, jobs, steps, runners, and automation.",
    "topic.terraform.description":
      "Infrastructure as Code — providers, resources, state, and the plan/apply cycle.",
    "topic.docker.description":
      "Containerization — images, containers, Dockerfiles, and registries.",

    // Quiz UI
    backToTopics: "Back to topics",
    previous: "Previous",
    next: "Next",
    submit: "Submit",
    retry: "Retry",
    allTopics: "All Topics",
    quizComplete: "Quiz Complete!",
    correct: (score: number, total: number) => `${score} of ${total} correct`,
    correctAnswer: "Correct:",
  },
  de: {
    // Navbar
    appTitle: "Quiz-App",

    // Home
    homeHeading: "Quiz-App",
    homeSubheading: "Wähle ein Thema und teste dein Wissen.",
    questionsCount: (n: number) => `${n} Fragen`,

    // Topic descriptions
    "topic.git.description":
      "Versionskontrolle — Commits, Branches, Merging und Zusammenarbeit.",
    "topic.github-actions.description":
      "CI/CD-Pipelines — Workflows, Jobs, Steps, Runner und Automatisierung.",
    "topic.terraform.description":
      "Infrastructure as Code — Provider, Ressourcen, State und der Plan/Apply-Zyklus.",
    "topic.docker.description":
      "Containerisierung — Images, Container, Dockerfiles und Registries.",

    // Quiz UI
    backToTopics: "Zurück zur Übersicht",
    previous: "Zurück",
    next: "Weiter",
    submit: "Abgeben",
    retry: "Nochmal",
    allTopics: "Alle Themen",
    quizComplete: "Quiz abgeschlossen!",
    correct: (score: number, total: number) => `${score} von ${total} richtig`,
    correctAnswer: "Richtig:",
  },
};

export type Translations = typeof translations.en;
export type TranslationKey = keyof Translations;

export default translations;
