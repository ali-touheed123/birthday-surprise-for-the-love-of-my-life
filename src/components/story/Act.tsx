import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ActProps {
  index: string;
  title: string;
  date: string;
  children: ReactNode;
  visual?: ReactNode;
}

export function Act({ index, title, date, children, visual }: ActProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-12"
    >
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
      >
        <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-[color:var(--gold-soft)]">
          <span className="h-px w-12 bg-[color:var(--gold-soft)]/60" />
          <span>Act {index}</span>
          <span className="h-px w-12 bg-[color:var(--gold-soft)]/60" />
        </div>
        <h2 className="font-display text-4xl leading-tight text-[color:var(--cream)] md:text-6xl">
          {title}
        </h2>
        <p className="mt-3 font-body text-sm italic text-[color:var(--rose-soft)] md:text-base">
          {date}
        </p>
        {visual && <div className="mt-12 w-full">{visual}</div>}
        <div className="mt-10 max-w-2xl space-y-6 font-body text-lg leading-relaxed text-[color:var(--cream)]/85 md:text-xl">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
