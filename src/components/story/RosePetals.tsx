import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Import all 9 petal images using relative paths
import p1 from "../../assets/petals/1.png";
import p2 from "../../assets/petals/2.png";
import p3 from "../../assets/petals/3.png";
import p4 from "../../assets/petals/4.png";
import p5 from "../../assets/petals/5.png";
import p6 from "../../assets/petals/6.png";
import p7 from "../../assets/petals/7.png";
import p8 from "../../assets/petals/8.png";
import p9 from "../../assets/petals/9.png";

const PETAL_IMAGES = [p1, p2, p3, p4, p5, p6, p7, p8, p9];

export function RosePetals({ count = 60 }: { count?: number }) {
  const [petals, setPetals] = useState<any[]>([]);

  useEffect(() => {
    const newPetals = Array.from({ length: count }).map((_, i) => {
      const type = Math.random();
      let hueRotate = 0;
      let brightness = 1;
      let saturate = 1;

      // Color distribution: Mostly red (60%), then white/yellow/blue/pink (40%)
      if (type > 0.6 && type <= 0.75) {
        // Yellow-ish
        hueRotate = 45 + Math.random() * 20;
        brightness = 1.2;
      } else if (type > 0.75 && type <= 0.85) {
        // Blue-ish
        hueRotate = 190 + Math.random() * 40;
        brightness = 0.9;
      } else if (type > 0.85 && type <= 0.92) {
        // Pink-ish
        hueRotate = 280 + Math.random() * 30;
      } else if (type > 0.92) {
        // White-ish (Desaturate and brighten)
        saturate = 0.1;
        brightness = 1.8;
      }

      return {
        id: i,
        img: PETAL_IMAGES[Math.floor(Math.random() * PETAL_IMAGES.length)],
        left: Math.random() * 100,
        size: 20 + Math.random() * 30,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 18,
        rotate: Math.random() * 360,
        sway: 40 + Math.random() * 80,
        filter: `hue-rotate(${hueRotate}deg) brightness(${brightness}) saturate(${saturate})`,
      };
    });
    setPetals(newPetals);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -100, opacity: 0, rotate: p.rotate, x: 0 }}
          animate={{
            y: "115vh",
            opacity: [0, 1, 1, 0],
            rotate: p.rotate + 1080, // More rotation for realism
            x: [0, p.sway, -p.sway, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
          className="absolute"
          style={{ left: `${p.left}%` }}
        >
          <img
            src={p.img}
            alt="Petal"
            style={{ 
              width: p.size, 
              height: "auto", 
              filter: `${p.filter} drop-shadow(2px 4px 6px rgba(0,0,0,0.2))`,
              transform: `scale(${0.7 + Math.random() * 0.6})`
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
