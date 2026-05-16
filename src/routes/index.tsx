import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { Starfield } from "@/components/story/Starfield";
import { Act } from "@/components/story/Act";

import classroomImg from "@/assets/classroom.jpg";
import bottleImg from "@/assets/bottle.png";
import chairImg from "@/assets/chair.jpg";
import journalImg from "@/assets/journal.jpg";
import starsImg from "@/assets/stars.jpg";
import silhouetteImg from "@/assets/silhouette.jpg";

import libraryWindImg from "@/assets/library_wind.png";
import gateLightImg from "@/assets/gate_light.png";
import sketchesImg from "@/assets/sketches.png";
import codeNightImg from "@/assets/code_night.png";
import windowVideo from "@/assets/Girl_standing_near_window_202605151426.mp4";
import animeVideo from "@/assets/anime.mp4";

function VideoFrame({ src, ratio = "16/10" }: { src: string; ratio?: string }) {
  return (
    <div
      className="group relative mx-auto w-full max-w-2xl overflow-hidden rounded-sm border border-[color:var(--gold)]/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
      style={{ aspectRatio: ratio }}
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-[1.2] origin-[30%_30%] transition-transform duration-[6000ms] ease-out group-hover:scale-[1.25]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--night-deep)]/80 via-transparent to-[color:var(--night-deep)]/30" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[color:var(--cream)]/5" />
    </div>
  );
}

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
        <p className="mb-14 font-display text-sm italic tracking-[0.3em] text-[color:var(--rose-soft)]/60">
          A love story in scroll
        </p>

        {showDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="mb-20"
          >
            <p className="font-body text-base font-bold uppercase tracking-[0.5em] text-[color:var(--gold)]">
              7 September 2021
            </p>
            <p className="mt-3 text-xs italic text-[color:var(--cream)]/40 uppercase tracking-[0.3em]">
              first day of college
            </p>
            <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-[color:var(--gold)]/40 to-transparent" />
          </motion.div>
        )}

        <p className="font-display text-3xl leading-snug text-[color:var(--cream)] md:text-5xl">
          <span className={!showLine2 ? "cursor" : ""}>{line1}</span>
        </p>
        {showLine2 && (
          <p className="mt-4 font-display text-2xl italic leading-snug text-[color:var(--cream)]/80 md:text-4xl">
            <span className={!showDate ? "cursor" : ""}>{line2}</span>
          </p>
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

function ChatBubbles() {
  const bubbles = [
    { side: "right", text: "I think I like you.", color: "gold" },
    { side: "left", text: "I can't.", color: "rose" },
    { side: "left", text: "You wouldn't understand.", color: "rose" },
    { side: "right", text: "I'm not going to give up.", color: "gold" },
  ];
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-3 md:max-w-md">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: b.side === "right" ? 30 : -30, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          className={`max-w-[85%] rounded-2xl px-5 py-3 font-body text-sm md:text-base ${b.side === "right"
            ? "self-end rounded-br-sm bg-[color:var(--gold)]/15 text-[color:var(--cream)] border border-[color:var(--gold)]/30 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
            : "self-start rounded-bl-sm bg-[color:var(--rose)]/15 text-[color:var(--cream)] border border-[color:var(--rose)]/30 shadow-[0_0_15px_rgba(224,33,138,0.1)]"
            }`}
        >
          {b.text}
        </motion.div>
      ))}
    </div>
  );
}

function Finale() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const yearScale = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  const yearOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3], [0, 1, 0]);

  const [showFinal, setShowFinal] = useState(false);
  const [hasFired, setHasFired] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.35 && !showFinal) {
      setShowFinal(true);
    }

    if (latest > 0.4 && !hasFired) {
      setHasFired(true);
      const duration = 5000;
      const animationEnd = Date.now() + duration;

      const interval: any = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / duration);

        // From Top (Falling rain)
        confetti({
          particleCount: particleCount * 0.8,
          spread: 120,
          startVelocity: 15,
          origin: { x: Math.random(), y: -0.1 },
          colors: ['#D4AF37', '#FFD700', '#FF3366', '#FFFFFF']
        });

        // From Left Cannon
        confetti({
          particleCount: particleCount * 0.5,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.5 },
          colors: ['#D4AF37', '#FF3366', '#FFD700']
        });

        // From Right Cannon
        confetti({
          particleCount: particleCount * 0.5,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.5 },
          colors: ['#D4AF37', '#FF3366', '#FFD700']
        });

        // From Bottom (Bursting up)
        confetti({
          particleCount: particleCount * 1,
          gravity: 1.2,
          scalar: 1,
          spread: 100,
          startVelocity: 35,
          origin: { x: 0.5, y: 1.1 },
          colors: ['#FFFFFF', '#FFD700', '#FF3366', '#D4AF37']
        });

        // Constant Center bursts
        confetti({
          particleCount: 10,
          spread: 360,
          startVelocity: 20,
          origin: { x: 0.5, y: 0.4 },
          colors: ['#FFD700', '#FFFFFF']
        });
      }, 300);
    } else if (latest < 0.2 && hasFired) {
      setHasFired(false);
    }
  });

  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
  return (
    <section
      ref={ref}
      className="relative flex min-h-[130vh] w-full flex-col items-center justify-start overflow-hidden"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 -z-20 bg-[color:var(--night-deep)]" />
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${starsImg})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div className="absolute inset-0 -z-10">
          <Starfield count={120} />
          <FloatingParticles />
        </div>
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showFinal ? 1 : 0, y: showFinal ? 0 : 20 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.5em] text-[#ffddaa] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
            five years. still here
          </p>
          <h2 className="font-display text-5xl font-black leading-tight text-white [text-shadow:0_4px_20px_rgba(0,0,0,0.9)] md:text-8xl">
            Happy Birthday,
          </h2>
          <h1 className="pulse-rose mt-4 font-display text-8xl font-black italic leading-none text-[#ff3366] [text-shadow:0_0_30px_rgba(255,51,102,0.6),0_4px_20px_rgba(0,0,0,0.9)] md:text-[11rem]">
            Noor
          </h1>
          <p className="mt-12 max-w-xl font-body text-lg font-bold italic leading-relaxed text-white [text-shadow:0_2px_15px_rgba(0,0,0,0.9)]">
            Whatever you choose, wherever you go, I am still the boy at the last
            desk, watching the door open.
          </p>
          <p className="mt-10 font-body text-sm font-bold uppercase tracking-[0.4em] text-[#ffcc00] [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
            — Ali
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    dur: 8 + Math.random() * 10,
    size: 2 + Math.random() * 4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "110vh", opacity: 0, x: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.8, 0.8, 0],
            x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25]
          }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "linear" }}
          className="absolute rounded-full bg-[color:var(--gold)] blur-[1px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 10px var(--gold)'
          }}
        />
      ))}
    </div>
  );
}

function FinalNote() {
  return (
    <section className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-32 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-xl"
      >
        <p className="mb-8 text-xs uppercase tracking-[0.5em] text-[color:var(--gold-soft)]">
          a final note
        </p>
        <p className="font-body text-lg italic leading-relaxed text-[color:var(--cream)]/90 md:text-xl">
          So today, smile a little extra, laugh a little louder.
          Because you’re not just loved, you’re genuinely appreciated.
        </p>

        <div className="my-16 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />

        <p className="font-display text-3xl italic text-[color:var(--rose)] md:text-4xl">
          One last thing…
        </p>

        <p className="mt-8 font-body text-base leading-relaxed text-[color:var(--cream)]/80">
          Stay exactly the way you are, that’s already more than enough.
        </p>

        <p className="mt-6 font-body text-sm italic leading-relaxed text-[color:var(--cream)]/60">
          Sending you an unreasonable amount of love, hugs, and all the good vibes in the universe,
          because honestly, you deserve nothing less.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="mt-32 max-w-lg"
      >
        <p className="font-display text-lg italic text-[color:var(--gold-soft)] leading-relaxed">
          "I love you from the very bottom of my soul. The man who has always
          loved you from the silence, without ever hearing your voice or seeing you
          a second time. My love remains as constant as the stars, pure and unwavering,
          even in the quietest of distances."
        </p>
      </motion.div>
    </section>
  );
}

export default function StoryPage() {
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
          date="14 September 2021 morning"
          visual={<PhotoFrame src={classroomImg} alt="An empty classroom with morning light pouring through the open door" />}
        >
          <p>
            I was at the back desk, facing the wall, chatting with my friends. The
            door behind me opened. I don't know why I turned around, but I did.
          </p>
          <p className="font-display text-2xl italic gold-text md:text-3xl">
            "How can someone be this beautiful?"
          </p>
          <p>
            Time literally stopped. My heart started racing like it wanted to jump
            out of my chest. From that day on, I abandoned my friends at the back.
            I started sitting in the front right corner, just because you sat there.
            I would watch you silently, wondering how you were even real.
          </p>
        </Act>

        <Act
          index="III"
          title="The Wind and The Book"
          date=""
          visual={<VideoFrame src={windowVideo} ratio="4/3" />}
        >
          <p>
            We had a library period. I had zero interest in reading, but I picked up
            an English novel just because. The next day, the classroom was mostly
            empty. You were sitting there, reading the book you borrowed.
          </p>
          <p>
            A soft breeze blew through the room, lifting your hair across your face.
            And when you gently tucked it behind your ears... my heart raced so violently
            I had to clutch my chest just so no one would notice.
          </p>
        </Act>

        <Act
          index="IV"
          title="The Injection Day"
          date=""
        >
          <p>
            They took us for Covid injections. Out of all the rooms, we ended up
            in the same one. You were standing there with your friend, laughing.
          </p>
          <p className="font-display text-2xl italic rose-text md:text-3xl">
            That smile was illegal.
          </p>
          <p>
            I desperately signaled for you to take the empty chair next to you, but
            you never noticed. At the medical camp, amidst all the chaos, my eyes
            were only searching for you.
          </p>
        </Act>

        <Act
          index="V"
          title="The Gate Encounter"
          date="a late morning"
          visual={<PhotoFrame src={gateLightImg} alt="A college gate bathed in golden light" ratio="4/3" />}
        >
          <p>
            You were running late. I wandered out to the classroom for some air,
            and just as I stepped out, you hurried in. We almost collided.
          </p>
          <p>
            I froze. My face flushed burning red. And in that fleeting, beautiful
            second of proximity, I realized you had the cutest height. Five years
            later, I still remember exactly how small you felt standing there.
          </p>
        </Act>

        <Act
          index="VI"
          title="The Water Bottle"
          date="a free period"
          visual={<PhotoFrame src={bottleImg} alt="Two hands holding a water bottle together in a school corridor" ratio="4/3" />}
        >
          <p>
            You and your friend were leaving the class. I panicked, thinking you
            were going for water. I hit my friend's arm—<span className="italic text-[color:var(--gold)]">"give me a bottle, quick!"</span>
          </p>
          <p>
            I handed it to you. For a few brief seconds, we both held it.
            You blushed so hard before walking away. My friends teased me endlessly.
            Later, your friend returned it, and I learned you were a medical student
            going to the lab, while I was stuck in engineering maths.
          </p>
        </Act>

        <Act
          index="VII"
          title="And Then She Left"
          date="late 2021"
          visual={<PhotoFrame src={chairImg} alt="A single empty chair beside a desk in a quiet classroom" ratio="4/3" />}
        >
          <p>
            Then, one day, you left the college entirely. I was completely devastated.
            I finally gathered the courage to ask your friend for your number.
          </p>
          <p className="font-display text-xl italic text-[color:var(--cream)]/80 md:text-2xl">
            "I like you."
          </p>
          <p>
            We talked for some days.I finally confessed. But you refused immediately. "I can't.
            You won't understand." But I wasn't the kind of guy to just give up.
          </p>
        </Act>

        <Act
          index="VIII"
          title="The Wall and The Distance"
          date=""
          visual={<ChatBubbles />}
        >
          <p>
            We talked endlessly, mostly me rambling. You rejected my picture requests,
            my voice notes, and even turned down my birthday gifts out of sheer innocence.
            Once, I accidentally called and your sister picked up, hanging up immediately.
          </p>
          <p>
            When she finally told me she saw me "as a brother," for the first time it felt so good when a girl make me her brother hehe. Eventually, I pulled away. Not because
            I stopped caring, but because you were na mehram, and I was terrified of
            making Allah angry and losing you from my destiny forever.
          </p>
        </Act>

        <Act
          index="IX"
          title="The Sketches"
          date=""
          visual={<PhotoFrame src={sketchesImg} alt="Hand-drawn pencil sketches of a girl on a dimly lit wooden desk" ratio="4/3" />}
        >
          <p>
            We reduced our words to just Eids and birthdays. I finally convinced you
            to send a picture, even if it was with a mask.
          </p>
          <p>
            Every time you posted a status, I took a screenshot. I spent hours alone
            at my desk, drawing pencil sketches of you, keeping them safely hidden away.
            My intentions were pure, and my trust in Allah remained absolute.
          </p>
        </Act>

        <Act
          index="X"
          title="The Promise"
          date="Present Day"
          visual={<PhotoFrame src={codeNightImg} alt="A glowing coding monitor in a dark room" ratio="4/3" />}
        >
          <p>
            Now, you are in University. And I am stepping into the professional world.
            I became a Software and AI Developer. I am building my own agency, working
            day and night, pushing myself beyond my limits.
          </p>
          <p className="font-display text-2xl italic gold-text md:text-3xl">
            Just for you.
          </p>
          <p>
            So that one day, when I am ready, I can walk up to your parents with
            pride and ask for you.
          </p>
        </Act>

        <Act
          index="XI"
          title="Let's Talk About You"
          date="always"
          visual={<VideoFrame src={animeVideo} ratio="4/3" />}
        >
          <p>
            We've talked about my promise, but let's talk about you. That smile of yours,
            the one that is absolutely illegal. Your hair, catching the wind and falling across your face,
            has always been my biggest melting point.
          </p>
          <p className="font-display text-2xl italic rose-text md:text-3xl">
            A heart like a diamond.
          </p>
          <p>
            Beyond the beauty, it is your essence that stays with me. Having known your character,
            your habits, and the depth of your soul over these five years, I know one thing for sure:
            you carry a strength that is both soft and absolute.
          </p>
          <p className="mt-4 font-body text-base italic text-[color:var(--gold)]">
            I see the woman you are becoming—someone who will guide with wisdom and nurture with a love
            that knows no bounds. Honestly, any children would be blessed beyond measure to have a mother
            like you to show them the world.
          </p>
        </Act>

        <Act
          index="XII"
          title="Today is Yours"
          date="your special day"
        >
          <p>
            Honestly, I believe Allah chose a beautiful day to bring someone like you into this world.
            Today is different. Because today… is yours.
          </p>
          <p className="font-display text-2xl italic gold-text md:text-3xl">
            No stress. No worries. Just full princess energy.
          </p>
          <p>
            I swear, you have this soft magic about you... the kind that makes everything feel
            lighter, calmer, and way happier just by existing. And somehow, without even trying,
            you've taken a very special place in my heart.
          </p>
        </Act>

        <Finale />

        <FinalNote />

        <footer className="relative z-10 py-12 text-center">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-[color:var(--cream)]/40">
            written by hand · made with everything I had
          </p>
        </footer>
      </div>
    </main>
  );
}
