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
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-24 md:px-12"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="glass-panel glass-panel-hover relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center rounded-2xl px-8 py-12 text-center md:px-16 md:py-20"
      >
        <div className="mb-8 flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.6em] text-[color:var(--gold)]/70 md:text-xs">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[color:var(--gold)]/40 md:w-16" />
          <span className="font-accent">Act {index}</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[color:var(--gold)]/40 md:w-16" />
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-display text-4xl leading-tight text-[color:var(--cream)] md:text-7xl"
        >
          {title}
        </motion.h2>
        
        <p className="mt-4 font-accent text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--rose-soft)] md:text-sm">
          {date}
        </p>
        
        {visual && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-16 w-full"
          >
            {visual}
          </motion.div>
        )}
        
        <div className="mt-12 max-w-2xl space-y-8 font-body text-lg leading-relaxed text-[color:var(--cream)]/90 md:text-2xl">
          {children}
        </div>
      </motion.div>
    </section>
  );
}
