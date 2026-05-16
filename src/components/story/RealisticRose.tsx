import { motion } from "framer-motion";

interface RealisticRoseProps {
  className?: string;
  size?: number;
  delay?: number;
}

export function RealisticRose({ className, size = 150, delay = 0 }: RealisticRoseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay, ease: "easeOut" }}
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800"
        alt="Realistic Rose"
        className="h-full w-full object-contain filter drop-shadow-[0_10px_30px_rgba(255,51,102,0.4)] brightness-90 contrast-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--night-deep)]/20 to-transparent mix-blend-overlay" />
    </motion.div>
  );
}
