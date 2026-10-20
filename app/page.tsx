import { ArrowDownToLine, ShieldCheck } from "lucide-react";
import { HeroDemo } from "@/components/HeroDemo";
import { Logo } from "@/components/Logo";
import { faqs, models, site } from "@/lib/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.asciiName,
    alternateName: site.name,
    description: site.description,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "macOS 14 or later",
    softwareVersion: site.version,
    url: site.url,
    image: `${site.url}/opengraph-image`,
    downloadUrl: new URL(site.download.url, site.url).toString(),
    fileSize: site.download.size,
    featureList: [
      "On-device transcription",
      "Push-to-talk dictation in any app",
      "Custom vocabulary",
      "Searchable transcript history",
      "Automatic punctuation and filler-word cleanup",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  },
];

const vocab = ["Anika Rao", "Kubernetes", "SOC 2", "gRPC", "Postgres"];

export default function Home() {
  return (
    <div className="shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label={`${site.name} home`}>
            <Logo size={30} />
            <span className="brand-name">{site.name}</span>
          </a>
          <nav aria-label="Primary" className="nav">
            <a href="#how">How it works</a>
            <a href="#features">Features</a>
            <a href="#models">Models</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a href="#download" className="btn btn-small">
            Download
          </a>
        </div>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="badge">
              <span className="badge-dot" />
              <span>Runs entirely on-device · macOS</span>
            </div>
            <h1 id="hero-title">Speak. {site.name} types.</h1>
            <p className="lead">
              Hold one key anywhere on your Mac and your words appear in the app you are already in. Everything runs
              on this machine.
            </p>
            <div className="cta-row">
              <a href={site.download.url} download={site.download.fileName} className="btn btn-large">
                <ArrowDownToLine size={17} strokeWidth={2} aria-hidden="true" />
                Download for Mac
              </a>
              <a href="#how" className="btn-ghost">
                See how it works
              </a>
            </div>
            <span className="mono-note">v{site.version} · macOS 14 or later · Apple silicon &amp; Intel</span>
          </div>

          <HeroDemo />
        </section>

        <section id="how" className="section" aria-labelledby="how-title">
          <div className="container">
            <span className="eyebrow">How it works</span>
            <h2 id="how-title" className="section-title">
              Works in every app with a text cursor.
            </h2>
            <ol className="steps">
              <li className="card step">
                <span className="step-num">01</span>
                <div className="keys" aria-hidden="true">
                  <kbd className="key">⌥</kbd>
                  <kbd className="key key-wide">Space</kbd>
                </div>
                <div>
                  <h3>Hold the shortcut</h3>
                  <p>Push to talk keeps the mic open only while the keys are down. Prefer toggle? Switch it in General.</p>
                </div>
              </li>
              <li className="card step">
                <span className="step-num">02</span>
                <div className="wave" aria-hidden="true">
                  {[
                    [12, "a"],
                    [24, "b"],
                    [36, "c"],
                    [20, "b"],
                    [30, "c"],
                    [14, "a"],
                    [26, "b"],
                    [10, "a"],
                  ].map(([h, tone], i) => (
                    <span key={i} className={`wave-${tone}`} style={{ height: h as number }} />
                  ))}
                </div>
                <div>
                  <h3>Speak naturally</h3>
                  <p>Talk at your normal pace. Punctuation and filler-word cleanup happen automatically.</p>
                </div>
              </li>
              <li className="card step">
                <span className="step-num">03</span>
                <div className="typed-sample" aria-hidden="true">
                  Ship it Thursday.
                  <span className="caret caret-static" />
                </div>
                <div>
                  <h3>Release, and it&apos;s typed</h3>
                  <p>Text lands at your cursor in Mail, Slack, Notion, your editor, anywhere. ⌘Z undoes it.</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section id="features" className="section" aria-labelledby="features-title">
          <div className="container">
            <span className="eyebrow">Features</span>
            <h2 id="features-title" className="section-title">
              Private by design. Fast enough to replace typing.
            </h2>
            <div className="features">
              <article id="privacy" className="card feature-hero">
                <div>
                  <div className="shield">
                    <ShieldCheck size={21} strokeWidth={1.75} aria-hidden="true" />
                  </div>
                  <h3 className="feature-hero-title">Nothing leaves this Mac.</h3>
                  <p className="feature-hero-text">
                    Audio is transcribed locally and discarded. No account, no server round-trip, and it keeps working
                    with Wi-Fi off.
                  </p>
                </div>
                <ul className="checklist">
                  <li>
                    <span className="check" aria-hidden="true">✓</span>Transcription runs on Apple silicon or Intel
                  </li>
                  <li>
                    <span className="check" aria-hidden="true">✓</span>Recordings discarded after transcription
                  </li>
                  <li>
                    <span className="check" aria-hidden="true">✓</span>History stays on disk, searchable only by you
                  </li>
                </ul>
              </article>

              <article className="card feature">
                <div>
                  <h3>Vocabulary</h3>
                  <p>Names and jargon {site.name} should never mishear.</p>
                </div>
                <div className="chips">
                  {vocab.map((w) => (
                    <span key={w} className="chip">
                      {w}
                    </span>
                  ))}
                  <span className="chip chip-accent">+ Add word</span>
                </div>
              </article>

              <article className="card feature">
                <div>
                  <h3>Lives in the menu bar</h3>
                  <p>No window to manage. Every action has a shortcut.</p>
                </div>
                <div className="menu">
                  <div>
                    Start dictation<kbd>⌥Space</kbd>
                  </div>
                  <div>
                    Dictate to clipboard<kbd>⌥⇧Space</kbd>
                  </div>
                  <div>
                    Clean up last transcript<kbd>⌥C</kbd>
                  </div>
                </div>
              </article>

              <article className="card feature">
                <div>
                  <h3>Searchable history</h3>
                  <p>Every transcript, tagged with the app it went into.</p>
                </div>
                <div className="history">
                  <div className="history-meta">
                    <span className="tag">Linear</span>
                    <span>12:38 · 137 words</span>
                  </div>
                  <p>
                    Ship the migration behind a flag on Thursday, then let support know before we flip it for everyone.
                  </p>
                </div>
              </article>

              <article className="card feature">
                <div>
                  <h3>Text cleanup</h3>
                  <p>What you meant, not every “um” you said.</p>
                </div>
                <ul className="toggles">
                  <li>
                    <span className="toggle on" aria-hidden="true" />
                    Remove filler words
                  </li>
                  <li>
                    <span className="toggle on" aria-hidden="true" />
                    Smart punctuation
                  </li>
                  <li className="off">
                    <span className="toggle" aria-hidden="true" />
                    Match app writing style
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section id="models" className="section" aria-labelledby="models-title">
          <div className="container models">
            <div className="models-intro">
              <span className="eyebrow">Models</span>
              <h2 id="models-title" className="section-title section-title-tight">
                Pick the engine that fits your Mac.
              </h2>
              <p>{site.name} downloads one model on first launch. Add or switch models any time from Settings.</p>
            </div>
            <ul className="model-list">
              {models.map((m) => (
                <li key={m.name} className="model">
                  <div className="model-head">
                    <h3>{m.name}</h3>
                    {m.recommended && <span className="rec">Recommended</span>}
                    <span className="model-meta">{m.meta}</span>
                  </div>
                  <p>{m.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="download" className="section" aria-labelledby="download-title">
          <div className="container">
            <div className="download">
              <Logo size={88} className="download-logo" />
              <h2 id="download-title">Download {site.name}</h2>
              <p className="download-lead">
                One universal build that runs natively on Apple silicon and Intel Macs.
              </p>
              <div className="download-buttons">
                <a href={site.download.url} download={site.download.fileName} className="dl dl-primary">
                  <span className="dl-name">
                    <ArrowDownToLine size={16} strokeWidth={2} aria-hidden="true" />
                    Download for Mac
                  </span>
                  <span className="dl-meta">Universal · Apple silicon &amp; Intel · .dmg · {site.download.size}</span>
                </a>
              </div>
              <span className="mono-note download-note">
                v{site.version} · macOS 14 Sonoma or later ·{" "}
                <a href={site.download.checksumUrl} className="checksum">
                  SHA-256
                </a>
              </span>
              <ol className="install">
                <li>
                  <span>1 · Install</span>Open the .dmg and drag {site.name} into Applications.
                </li>
                <li>
                  <span>2 · Allow access</span>Grant Microphone and Accessibility so {site.name} can hear you and type
                  into other apps.
                </li>
                <li>
                  <span>3 · Get a model</span>Whisper Large V3 Turbo downloads on first launch. Then hold ⌥ Space.
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section id="faq" className="section" aria-labelledby="faq-title">
          <div className="container container-narrow">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-title" className="section-title">
              Questions
            </h2>
            <div className="faq">
              {faqs.map((f, i) => (
                <details key={f.q} open={i === 0} name="faq">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <Logo size={22} />
            <span className="footer-name">{site.name}</span>
            <span className="footer-note">声 · Japanese for voice</span>
          </div>
          <nav aria-label="Footer" className="footer-nav">
            <a href="#download">Download</a>
            {site.links.releaseNotes && <a href={site.links.releaseNotes}>Release notes</a>}
            <a href="#privacy">Privacy</a>
            {site.links.contact && <a href={site.links.contact}>Contact</a>}
          </nav>
        </div>
      </footer>
    </div>
  );
}
