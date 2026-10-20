const env = (value: string | undefined, fallback: string) =>
  value && value.trim() !== "" ? value.trim() : fallback;

export const site = {
  name: "Kōe",
  asciiName: "Koe",
  tagline: "Speech to text, on your Mac only",
  title: "Kōe — Private speech to text for Mac",
  description:
    "Hold one key anywhere on your Mac and your words appear in the app you are already in. Kōe transcribes on-device with Whisper — no account, no cloud, works offline.",
  keywords: [
    "speech to text Mac",
    "dictation app macOS",
    "offline dictation",
    "on-device transcription",
    "private voice typing",
    "Whisper Mac app",
    "push to talk dictation",
    "voice to text",
  ],
  url: env(
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ).replace(/\/$/, ""),
  version: env(process.env.NEXT_PUBLIC_APP_VERSION, "1.0.0"),
  downloads: {
    appleSilicon: env(process.env.NEXT_PUBLIC_DOWNLOAD_URL_APPLE_SILICON, "#download"),
    intel: env(process.env.NEXT_PUBLIC_DOWNLOAD_URL_INTEL, "#download"),
  },
  links: {
    releaseNotes: process.env.NEXT_PUBLIC_RELEASE_NOTES_URL || "",
    contact: process.env.NEXT_PUBLIC_CONTACT_URL || "",
  },
  brandColor: "#d9472b",
  background: "#0e0b09",
};

export const models = [
  {
    name: "Whisper Large V3 Turbo",
    recommended: true,
    meta: "1.6 GB · 99 languages",
    description: "Fast and highly accurate, even with accents, technical vocabulary and noisy rooms.",
  },
  {
    name: "Whisper Medium",
    recommended: false,
    meta: "1.5 GB · 99 languages",
    description: "Lighter on memory. A good pick for Intel Macs or when battery matters.",
  },
];

export const faqs = [
  {
    q: "Does my audio leave my Mac?",
    a: "No. Transcription runs locally on your Mac and the audio is discarded once the text is inserted. Kōe works with no internet connection after the model is downloaded.",
  },
  {
    q: "Which apps does it work in?",
    a: "Any app with a text cursor: Mail, Messages, Slack, Notion, Linear, code editors, browsers. You can also dictate straight to the clipboard with ⌥⇧Space.",
  },
  {
    q: "Which Macs are supported?",
    a: "macOS 14 Sonoma or later, on Apple silicon or Intel. Larger models run best on Apple silicon; Whisper Medium is the lighter choice for Intel.",
  },
  {
    q: "Why does it need Accessibility access?",
    a: "macOS requires it for any app that types into other apps. Kōe uses it only to insert your transcript at the cursor.",
  },
  {
    q: "Can it learn names and jargon?",
    a: "Yes. Add words to Vocabulary and Kōe will prefer those spellings, so names like Anika Rao or terms like gRPC come out right.",
  },
];
