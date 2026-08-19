import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rise ${className}`}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="label-xs">{children}</p>;
}

export function LuxButton({
  children,
  variant = "solid",
  href = "#",
}: {
  children: ReactNode;
  variant?: "solid" | "ghost";
  href?: string;
}) {
  return (
    <a
      href={href}
      className={
        variant === "solid"
          ? "inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-[0.7rem] tracking-[0.3em] uppercase text-primary-foreground transition-all duration-500 hover:scale-[1.03] hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          : "inline-flex items-center justify-center rounded-full border border-border px-8 py-3 text-[0.7rem] tracking-[0.3em] uppercase text-foreground transition-all duration-500 hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      }
    >
      {children}
    </a>
  );
}
