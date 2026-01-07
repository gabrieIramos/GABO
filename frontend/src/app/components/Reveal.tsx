import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  distance?: number; // px
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 24,
  direction = 'up',
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, once]);

  const hiddenTransform = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  }[direction];

  return (
    <div
      ref={ref}
      className={clsx(
        'will-change-transform will-change-opacity transition-transform transition-opacity duration-700 ease-out',
        visible ? 'opacity-100 translate-x-0 translate-y-0' : 'opacity-0',
        className
      )}
      style={visible ? undefined : { transform: hiddenTransform }}
    >
      {children}
    </div>
  );
}
