import { useMemo } from "react";

export function Starfield({ count = 80, className = "" }: { count?: number; className?: string }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 4,
        dur: 2 + Math.random() * 4,
      })),
    [count]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            // @ts-ignore
            "--delay": `${s.delay}s`,
            "--dur": `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
