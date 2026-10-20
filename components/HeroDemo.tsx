"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

const SENTENCES = [
  "Ship the migration behind a flag on Thursday, then let support know before we flip it for everyone.",
  "If the error rate holds under half a percent through the weekend, we can drop the flag on Monday.",
  "Anika has the rollback plan, so ping her first if anything looks off.",
];
const BARS = [8, 15, 24, 12, 19, 24, 10, 17, 22, 9, 14, 20, 7, 16].map((h, i) => ({
  h,
  d: (0.55 + (i % 5) * 0.12).toFixed(2),
}));

type Phase = "idle" | "listening" | "transcribing" | "done";

export function HeroDemo({ autoplay = true }: { autoplay?: boolean }) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState(SENTENCES[0]);
  const [secs, setSecs] = useState(0);
  const [words, setWords] = useState(0);

  const phaseRef = useRef<Phase>("idle");
  const idxRef = useRef(0);
  const userRef = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const tick = useRef<ReturnType<typeof setInterval>>(undefined);
  const typer = useRef<ReturnType<typeof setInterval>>(undefined);
  const autoCycleRef = useRef<() => void>(() => {});

  const go = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  };
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const start = useCallback(() => {
    if (phaseRef.current === "listening") return;
    clearInterval(typer.current);
    clearInterval(tick.current);
    go("listening");
    setSecs(0);
    setTyped("");
    tick.current = setInterval(() => setSecs((s) => s + 1), 1000);
  }, []);

  const stop = useCallback(() => {
    clearInterval(tick.current);
    const text = SENTENCES[idxRef.current % SENTENCES.length];
    go("transcribing");
    later(() => {
      let i = 0;
      typer.current = setInterval(() => {
        i += 2;
        setTyped(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(typer.current);
          idxRef.current += 1;
          setWords(text.split(/\s+/).length);
          go("done");
          later(() => {
            go("idle");
            if (autoplay && !userRef.current) later(() => autoCycleRef.current(), 1600);
          }, 2200);
        }
      }, 22);
    }, 450);
  }, [autoplay]);

  const autoCycle = useCallback(() => {
    if (userRef.current) return;
    start();
    later(stop, 2600);
  }, [start, stop]);
  autoCycleRef.current = autoCycle;

  const userStart = useCallback(() => {
    userRef.current = true;
    clearTimers();
    start();
  }, [start]);

  const userEnd = useCallback(() => {
    if (phaseRef.current === "listening") stop();
  }, [stop]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "Space") {
        e.preventDefault();
        if (!e.repeat) userStart();
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.key === "Alt") userEnd();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (autoplay && !reduceMotion) later(autoCycle, 1400);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      clearTimers();
      clearInterval(tick.current);
      clearInterval(typer.current);
    };
  }, [autoplay, autoCycle, userStart, userEnd]);

  return (
    <div className="demo">
      <div className="demo-stage">
        <div className="mail" aria-label="Example: dictating an email">
          <div className="mail-bar">
            <div className="traffic" aria-hidden="true">
              <span style={{ background: "#ff5f57" }} />
              <span style={{ background: "#febc2e" }} />
              <span style={{ background: "#28c840" }} />
            </div>
            <span className="mail-title">New message</span>
          </div>
          <div className="mail-fields">
            <div className="mail-field">
              <span>To</span>
              <span>Support team</span>
            </div>
            <div className="mail-field">
              <span>Subject</span>
              <span>Thursday rollout</span>
            </div>
          </div>
          <div className="mail-body" aria-live="polite">
            <p>Hi team,</p>
            <p>
              {typed}
              <span className="caret" aria-hidden="true" />
            </p>
          </div>
        </div>

        <div className="pill-row">
          <div className="pill" role="status">
            {phase === "idle" && (
              <>
                <Logo size={22} variant="mark" />
                <span className="pill-sep" />
                <span className="pill-text">
                  Hold <kbd>⌥ Space</kbd> to speak
                </span>
              </>
            )}
            {phase === "listening" && (
              <>
                <span className="rec-dot" />
                <span className="bars" aria-hidden="true">
                  {BARS.map((b, i) => (
                    <span key={i} style={{ height: b.h, animationDuration: `${b.d}s` }} />
                  ))}
                </span>
                <span className="pill-clock">0:{String(secs).padStart(2, "0")}</span>
                <span className="sr-only">Listening</span>
              </>
            )}
            {phase === "transcribing" && (
              <>
                <span className="dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="pill-text">Transcribing · Whisper Turbo</span>
              </>
            )}
            {phase === "done" && (
              <>
                <span className="check" aria-hidden="true">✓</span>
                <span className="pill-text pill-text-strong">{words} words inserted</span>
                <span className="pill-hint">⌘Z to undo</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="try-row">
        <button
          type="button"
          className="try-btn"
          onPointerDown={(e) => {
            e.preventDefault();
            userStart();
          }}
          onPointerUp={userEnd}
          onPointerLeave={userEnd}
        >
          <span className="try-dot" />
          Press and hold to try it
        </button>
        <span className="try-hint">
          or hold <kbd>⌥ Space</kbd> on this page
        </span>
      </div>
    </div>
  );
}
