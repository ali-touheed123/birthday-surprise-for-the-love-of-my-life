import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Starfield } from "@/components/story/Starfield";
import { Act } from "@/components/story/Act";
import classroomImg from "@/assets/classroom.jpg";
import bottleImg from "@/assets/bottle.jpg";
import chairImg from "@/assets/chair.jpg";
import journalImg from "@/assets/journal.jpg";
import starsImg from "@/assets/stars.jpg";
import silhouetteImg from "@/assets/silhouette.jpg";

function PhotoFrame({ src, alt, ratio = "16/10" }: { src: string; alt: string; ratio?: string }) {
  return (
    <div
      className="group relative mx-auto w-full max-w-2xl overflow-hidden rounded-sm border border-[color:var(--gold)]/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
      style={{ aspectRatio: ratio }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[6000ms] ease-out group-hover:scale-105"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--night-deep)]/80 via-transparent to-[color:var(--night-deep)]/30" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[color:var(--cream)]/5" />
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: StoryPage,
});

function useTypewriter(text: string, start: boolean, speed = 55) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, start, speed]);
  return out;
}

function Opening() {
  const ref = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(t);
  }, []);
  const line1 = useTypewriter("I made one promise to myself.", started, 70);
  const showLine2 = line1.length >= "I made one promise to myself.".length;
  const line2 = useTypewriter("Just studies. No distractions.", showLine2, 70);
  const showDate = line2.length >= "Just studies. No distractions.".length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const moonY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
    >
      <Starfield count={140} />
      <motion.div
        style={{ y: moonY }}
        className="pointer-events-none absolute right-[10%] top-[14%] h-32 w-32 rounded-full bg-gradient-to-br from-[color:var(--cream)]/90 via-[color:var(--gold-soft)]/40 to-transparent blur-md md:h-44 md:w-44"
      />
      <motion.div style={{ opacity }} className="relative z-10 max-w-3xl text-center">
        <p className="mb-8 text-xs uppercase tracking-[0.5em] text-[color:var(--gold-soft)]">
          A love story · in scroll
        </p>
        <p className="font-display text-3xl leading-snug text-[color:var(--cream)] md:text-5xl">
          <span className={!showLine2 ? "cursor" : ""}>{line1}</span>
        </p>
        {showLine2 && (
          <p className="mt-4 font-display text-2xl italic leading-snug text-[color:var(--cream)]/80 md:text-4xl">
            <span className={!showDate ? "cursor" : ""}>{line2}</span>
          </p>
        )}
        {showDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-16"
          >
            <div className="mx-auto h-px w-24 bg-[color:var(--gold)]/50" />
            <p className="mt-6 font-body text-sm uppercase tracking-[0.4em] text-[color:var(--gold)]">
              7 September 2021
            </p>
            <p className="mt-2 text-xs italic text-[color:var(--cream)]/50">
              first day of college
            </p>
          </motion.div>
        )}
      </motion.div>
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3], y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-10 z-10 text-xs uppercase tracking-[0.4em] text-[color:var(--cream)]/60"
      >
        scroll to begin ↓
      </motion.div>
    </section>
  );
}

function ClassroomVisual() {
  return (
    <div className="relative mx-auto h-56 w-full max-w-md overflow-hidden rounded-sm border border-[color:var(--gold)]/20 bg-[color:var(--night-deep)]/60 md:h-64">
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--gold)]/15 via-transparent to-transparent" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-[color:var(--gold)]/40 to-transparent blur-2xl" />
      <div className="grid h-full grid-cols-4 gap-3 p-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="rounded-sm border border-[color:var(--cream)]/10 bg-[color:var(--cream)]/[0.02]"
          />
        ))}
      </div>
      <div className="absolute right-6 top-6 h-3 w-3 rounded-full bg-[color:var(--rose)] shadow-[0_0_18px_var(--rose)]" />
    </div>
  );
}

function HeartVisual() {
  return (
    <div className="relative mx-auto h-48 w-48">
      <div className="absolute inset-0 rounded-full bg-[color:var(--rose)]/10 blur-3xl" />
      <div className="heartbeat absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="h-32 w-32">
          <defs>
            <radialGradient id="g" cx="50%" cy="40%">
              <stop offset="0%" stopColor="oklch(0.85 0.15 15)" />
              <stop offset="100%" stopColor="oklch(0.55 0.18 15)" />
            </radialGradient>
          </defs>
          <path
            d="M50 85 C 20 60, 10 35, 30 25 C 42 19, 50 30, 50 38 C 50 30, 58 19, 70 25 C 90 35, 80 60, 50 85 Z"
            fill="url(#g)"
            stroke="oklch(0.85 0.15 15)"
            strokeWidth="0.5"
          />
        </svg>
      </div>
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="star"
          style={{
            background: "var(--rose)",
            top: `${50 + Math.cos((i / 18) * Math.PI * 2) * 45}%`,
            left: `${50 + Math.sin((i / 18) * Math.PI * 2) * 45}%`,
            width: 3,
            height: 3,
            // @ts-ignore
            "--dur": "1.4s",
            "--delay": `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}

function BottleVisual() {
  return (
    <motion.div
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
      className="mx-auto h-48 w-20"
    >
      <div className="relative h-full w-full">
        <div className="absolute inset-x-4 top-0 h-6 rounded-t-md bg-[color:var(--cream)]/30" />
        <div className="absolute inset-x-0 top-6 bottom-0 rounded-md bg-gradient-to-b from-[color:var(--cream)]/15 via-[color:var(--rose)]/10 to-[color:var(--gold)]/15 backdrop-blur-sm border border-[color:var(--cream)]/15" />
        <div className="absolute inset-x-2 top-16 h-12 rounded-sm border border-[color:var(--gold-soft)]/40 bg-[color:var(--gold)]/5" />
      </div>
      <div className="mt-4 h-8 w-32 -translate-x-6 rounded-full bg-[color:var(--rose)]/20 blur-2xl" />
    </motion.div>
  );
}

function ChairVisual() {
  return (
    <div className="relative mx-auto h-56 w-44">
      <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-[color:var(--cream)]/10 to-transparent" />
      <div className="absolute left-1/2 top-6 h-32 w-24 -translate-x-1/2 rounded-t-md border border-[color:var(--cream)]/20 bg-[color:var(--cream)]/[0.03]" />
      <div className="absolute left-1/2 top-32 h-3 w-28 -translate-x-1/2 rounded-sm bg-[color:var(--cream)]/10" />
      <div className="absolute bottom-2 left-[28%] h-16 w-1 bg-[color:var(--cream)]/15" />
      <div className="absolute bottom-2 right-[28%] h-16 w-1 bg-[color:var(--cream)]/15" />
      <div className="absolute -inset-10 -z-10 rounded-full bg-[color:var(--gold)]/5 blur-3xl" />
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="star"
          style={{
            background: "var(--cream)",
            top: `${20 + Math.random() * 60}%`,
            left: `${Math.random() * 100}%`,
            width: 1.5,
            height: 1.5,
            // @ts-ignore
            "--dur": "5s",
            "--delay": `${i * 0.3}s`,
          }}
        />
      ))}
    </div>
  );
}

function ChatBubbles() {
  const bubbles = [
    { side: "right", text: "I think I like you.", color: "gold" },
    { side: "left", text: "It can't happen.", color: "rose" },
    { side: "left", text: "You don't understand.", color: "rose" },
    { side: "right", text: "I'm not asking you to.", color: "gold" },
    { side: "right", text: "I'm just not leaving.", color: "gold" },
  ];
  return (
    <div className="mx-auto flex max-w-md flex-col gap-3">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: b.side === "right" ? 30 : -30, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: i * 0.35, duration: 0.6 }}
          className={`max-w-[78%] rounded-2xl px-5 py-3 font-body text-base ${
            b.side === "right"
              ? "self-end rounded-br-sm bg-[color:var(--gold)]/15 text-[color:var(--cream)] border border-[color:var(--gold)]/30"
              : "self-start rounded-bl-sm bg-[color:var(--rose)]/15 text-[color:var(--cream)] border border-[color:var(--rose)]/30"
          }`}
        >
          {b.text}
        </motion.div>
      ))}
    </div>
  );
}

function SketchbookVisual() {
  return (
    <div className="relative mx-auto h-64 w-full max-w-lg perspective-[1200px]">
      <motion.div
        initial={{ rotateX: 30, opacity: 0 }}
        whileInView={{ rotateX: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative mx-auto h-full w-full"
      >
        <div className="absolute inset-0 grid grid-cols-2 gap-1 rounded-sm border border-[color:var(--gold-soft)]/40 bg-[color:var(--cream)]/[0.04] p-1 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
          {[0, 1].map((side) => (
            <div
              key={side}
              className="relative flex items-center justify-center rounded-sm bg-[oklch(0.92_0.02_80)]/95 p-3"
            >
              <svg viewBox="0 0 100 120" className="h-full w-full">
                <g
                  fill="none"
                  stroke="oklch(0.25 0.04 30)"
                  strokeWidth="0.6"
                  strokeLinecap="round"
                >
                  <ellipse cx="50" cy="48" rx="22" ry="28" />
                  <path d="M30 40 Q40 18 50 22 Q60 18 72 38" />
                  <path d="M40 50 Q42 52 44 50" />
                  <path d="M56 50 Q58 52 60 50" />
                  <path d="M44 64 Q50 68 56 64" />
                  <path d="M28 78 Q50 92 72 78 L72 118 L28 118 Z" />
                </g>
              </svg>
              <span className="absolute bottom-2 right-3 text-[8px] uppercase tracking-widest text-[oklch(0.25_0.04_30)]/60">
                #{side === 0 ? "027" : "041"}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const yearScale = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);
  const yearOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 0]);
  const finalOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
  return (
    <section
      ref={ref}
      className="relative flex min-h-[200vh] w-full flex-col items-center justify-start overflow-hidden"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6">
        <Starfield count={200} />
        <motion.div
          style={{ scale: yearScale, opacity: yearOpacity }}
          className="flex items-center gap-6 font-display text-2xl text-[color:var(--cream)]/60 md:gap-10 md:text-4xl"
        >
          {years.map((y, i) => (
            <span key={y} className={i === years.length - 1 ? "gold-text" : ""}>
              {y}
            </span>
          ))}
        </motion.div>
        <motion.div
          style={{ opacity: finalOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-[color:var(--gold-soft)]">
            five years · still here
          </p>
          <h2 className="font-display text-5xl leading-tight text-[color:var(--cream)] md:text-7xl">
            Happy Birthday,
          </h2>
          <h1 className="pulse-rose mt-4 font-display text-7xl italic leading-none text-[color:var(--rose)] md:text-9xl">
            Noor
          </h1>
          <p className="mt-10 max-w-md font-body text-base italic text-[color:var(--cream)]/70 md:text-lg">
            Whatever you choose, wherever you go — I am still the boy at the last
            desk, watching the door open.
          </p>
          <p className="mt-8 font-body text-xs uppercase tracking-[0.4em] text-[color:var(--gold)]">
            — Ali
          </p>
        </motion.div>
        <FallingStars />
      </div>
    </section>
  );
}

function FallingStars() {
  const stars = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    dur: 4 + Math.random() * 5,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s) => (
        <motion.span
          key={s.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "linear" }}
          className="absolute h-px w-px"
          style={{ left: `${s.left}%` }}
        >
          <span className="block h-1 w-1 rounded-full bg-[color:var(--gold)] shadow-[0_0_8px_var(--gold)]" />
          <span className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-[color:var(--gold)]/60 to-transparent" />
        </motion.span>
      ))}
    </div>
  );
}

function StoryPage() {
  return (
    <main className="relative w-full bg-[color:var(--night-deep)]">
      {/* Persistent star field behind everything */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Starfield count={120} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.18_0.04_280)/40%,transparent_60%)]" />
      </div>

      <div className="relative z-10">
        <Opening />

        <Act
          index="II"
          title="The Last Desk"
          date="14 September 2021 · morning"
          visual={<ClassroomVisual />}
        >
          <p>
            I was at the back. The door behind me, the world ahead, none of it
            interesting yet. Then a sound — wood against wood, the door pulled
            open, and the morning light spilled into the room like it had been
            waiting.
          </p>
          <p className="font-display text-2xl italic gold-text md:text-3xl">
            "How can someone be this beautiful?"
          </p>
          <p>
            That was the first thought. Not a sentence I built — a sentence that
            arrived. And the room, for one quiet second, forgot how to keep time.
          </p>
        </Act>

        <Act
          index="III"
          title="The Heart That Wanted Out"
          date="the days that followed"
          visual={<HeartVisual />}
        >
          <p>
            After that morning I moved to the front. Not for the lessons — for the
            angle. So I could see her without turning around, so my heart wouldn't
            have to ask permission.
          </p>
          <p>
            Every time the wind moved her hair and she tucked it behind her ear,
            something inside me would push, and push, and push — like it wanted to
            walk straight out of my chest and stand next to her.
          </p>
        </Act>

        <Act index="IV" title="The Injection Day" date="October 2021">
          <p>
            Two queues, one corridor, the smallest coincidence in the world — and
            somehow, the same room. She was standing with her friend, laughing at
            something I will never know.
          </p>
          <p className="font-display text-2xl italic rose-text md:text-3xl">
            That smile was illegal.
          </p>
          <p>
            I have replayed it more times than I should admit. A laugh that didn't
            ask to be remembered, but was — every detail, every rib of light.
          </p>
        </Act>

        <Act
          index="V"
          title="The Water Bottle"
          date="a free period"
          visual={<BottleVisual />}
        >
          <p>
            I panicked. I actually slapped my friend's arm and hissed —{" "}
            <span className="italic text-[color:var(--gold)]">
              "the bottle, give me the bottle, quick."
            </span>{" "}
            I ran out before I could think of a better plan.
          </p>
          <p>
            Our hands held it together for maybe three seconds. Long enough for
            the room to slow down. She looked away first. She blushed. I think I
            blushed harder. Three seconds — and it became a memory I have spent
            five years not putting down.
          </p>
        </Act>

        <Act
          index="VI"
          title="And Then She Left"
          date="late 2021"
          visual={<ChairVisual />}
        >
          <p>
            One day the corner chair was empty. The next day too. And the next.
            The classroom kept happening, the lectures kept arriving, but the air
            was lighter in the wrong way — like a song missing its quietest note.
          </p>
          <p className="font-display text-xl italic text-[color:var(--cream)]/80 md:text-2xl">
            I was sad. Not a small sadness. A real one.
          </p>
          <p>
            So I did the only brave thing I could think of. I texted her friend.</p>
        </Act>

        <Act
          index="VII"
          title="I Like You · And the Wall"
          date="2021 — 2022"
          visual={<ChatBubbles />}
        >
          <p>
            Some sentences take five seconds to send and five years to recover
            from. I sent mine. The reply came back gentler than I expected and
            harder than I'd hoped.
          </p>
          <p>
            There was a wall. There were reasons. There were lives more
            complicated than my one feeling. I understood. I really did.
          </p>
          <p className="font-display text-2xl italic gold-text md:text-3xl">
            I just didn't leave.
          </p>
        </Act>

        <Act
          index="VIII"
          title="Sketches & Secrets"
          date="2022 — 2024"
          visual={<SketchbookVisual />}
        >
          <p>
            I started saving every status you posted. Not in a strange way — in
            the only way I knew how to keep something that wasn't mine to keep.
          </p>
          <p>
            Then I started drawing them. Page after page. Some are bad. Some I'm
            quietly proud of. All of them are folded carefully into a book I
            haven't shown anyone. I don't think I ever will.
          </p>
          <p className="font-body text-base text-[color:var(--cream)]/70">
            They were never meant to be seen. They were meant to prove, to me,
            that I was paying attention.
          </p>
        </Act>

        <Finale />

        <footer className="relative z-10 py-12 text-center">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-[color:var(--cream)]/40">
            written by hand · made with everything I had
          </p>
        </footer>
      </div>
    </main>
  );
}
