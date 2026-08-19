import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Heart, Eye, Sparkles, RotateCcw, Camera, Send } from "lucide-react";

import { SiteNav } from "@/components/site-nav";
import { Reveal, SectionLabel, LuxButton } from "@/components/lux";
import hero from "@/assets/hero.jpg";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import packaging from "@/assets/packaging.jpg";

const TITLE = "Aurelune — Futuristic Luxury Jewelry";
const DESC =
  "Aurelune crafts futuristic luxury jewelry: diamond rings, platinum necklaces and bespoke pieces where timeless craftsmanship meets the future of luxury.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

const products = [
  { name: "Lumen Solitaire", cat: "Rings", price: "₹4,80,000", img: hero },
  { name: "Celeste Pendant", cat: "Necklaces", price: "₹2,15,000", img: p1 },
  { name: "Arc Signet", cat: "Bracelets", price: "₹1,64,000", img: p2 },
  { name: "Verdant Drop", cat: "Earrings", price: "₹3,42,000", img: p3 },
];

const categories = [
  "Rings",
  "Necklaces",
  "Bracelets",
  "Earrings",
  "Watches",
  "Men's Jewelry",
  "Women's Jewelry",
  "Bespoke",
];

const materials = [
  { n: "Gold", o: "Kolar, India", c: "18K, warm champagne tone", q: "Hallmarked 750" },
  { n: "Platinum", o: "Bushveld, RSA", c: "95% pure, hypoallergenic", q: "PT950 certified" },
  { n: "Diamonds", o: "Botswana", c: "Ideal-cut brilliance", q: "GIA graded D–F / VVS" },
  { n: "Emeralds", o: "Muzo, Colombia", c: "Vivid saturation", q: "Untreated, lab-verified" },
  { n: "Rubies", o: "Mogok, Myanmar", c: "Pigeon-blood red", q: "Ethically traced" },
  { n: "Pearls", o: "Akoya, Japan", c: "Mirror lustre", q: "Hand-matched strands" },
];

const steps = [
  ["01", "Consultation", "A private session to understand the story behind the piece."],
  ["02", "Concept", "Sketches and mood direction from our design atelier."],
  ["03", "Design", "Digital modelling with live material previews."],
  ["04", "Craft", "Hand-finished by master jewellers over 60–120 hours."],
  ["05", "Delivery", "Presented in signature packaging with certification."],
];

function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setOffset({
        x: (e.clientX / window.innerWidth - 0.5) * 18,
        y: (e.clientY / window.innerHeight - 0.5) * 12,
      });
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <img
        src={hero}
        alt="Champagne gold solitaire ring lit by cinematic light rays"
        width={1600}
        height={1104}
        className="absolute inset-0 size-full object-cover opacity-70"
        style={{
          transform: `scale(1.08) translate3d(${offset.x}px, ${offset.y + scrollY * 0.12}px, 0)`,
          transition: "transform 900ms cubic-bezier(0.22,1,0.36,1)",
        }}
      />
      <div className="absolute inset-0 bg-background/55" />
      <div className="veil absolute inset-0" />

      <div className="relative z-10 max-w-3xl px-6 text-center">
        <Reveal>
          <SectionLabel>Maison Aurelune — Est. 2049</SectionLabel>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="mt-8 font-display text-5xl leading-[1.05] tracking-[0.06em] sm:text-7xl md:text-8xl">
            JEWELRY,
            <br />
            <span className="text-gilded italic">REIMAGINED.</span>
          </h1>
        </Reveal>
        <Reveal delay={320}>
          <p className="mx-auto mt-8 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
            Where timeless craftsmanship meets the future of luxury.
          </p>
        </Reveal>
        <Reveal delay={480}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <LuxButton href="#collections">Explore Collection</LuxButton>
            <LuxButton variant="ghost" href="#our-story">
              Discover the World
            </LuxButton>
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute inset-0">
        {[...Array(14)].map((_, i) => (
          <span
            key={i}
            className="absolute size-[3px] rounded-full bg-primary/40 animate-pulse"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 61) % 100}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "4s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

function Shell({
  id,
  label,
  title,
  children,
}: {
  id?: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-28 md:py-36">
      <Reveal>
        <SectionLabel>{label}</SectionLabel>
        <h2 className="mt-5 font-display text-4xl tracking-[0.08em] md:text-6xl">{title}</h2>
      </Reveal>
      <div className="mt-16">{children}</div>
    </section>
  );
}

function Concierge() {
  const [msg, setMsg] = useState("");
  const [thread, setThread] = useState<{ role: "you" | "aura"; text: string }[]>([
    {
      role: "aura",
      text: "I am AURA. Tell me the occasion, the budget and the person — I will curate three pieces.",
    },
  ]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msg.trim()) return;
    const q = msg.trim();
    setThread((t) => [
      ...t,
      { role: "you", text: q },
      {
        role: "aura",
        text: "Considered. I would suggest the Celeste Pendant in platinum with a D-colour diamond, the Arc Signet in 18K gold, and a bespoke engraving. Shall I reserve a private viewing?",
      },
    ]);
    setMsg("");
  };

  return (
    <div className="glass mx-auto max-w-2xl rounded-2xl p-8">
      <div className="flex items-center gap-3">
        <Sparkles className="size-4 text-primary" strokeWidth={1.2} />
        <p className="label-xs">AURA — Private Concierge</p>
      </div>
      <div className="mt-8 space-y-5">
        {thread.map((m, i) => (
          <p
            key={i}
            className={`max-w-[85%] text-sm font-light leading-relaxed ${
              m.role === "aura" ? "text-foreground" : "ml-auto text-right text-muted-foreground"
            }`}
          >
            {m.text}
          </p>
        ))}
      </div>
      <form onSubmit={send} className="mt-8 flex items-center gap-3 border-t border-border pt-6">
        <label htmlFor="aura" className="sr-only">
          Ask AURA
        </label>
        <input
          id="aura"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="A sophisticated anniversary gift under ₹50,000…"
          className="w-full bg-transparent text-sm font-light outline-none placeholder:text-muted-foreground/60"
        />
        <button
          type="submit"
          aria-label="Send to AURA"
          className="text-primary transition-transform hover:scale-110"
        >
          <Send className="size-4" strokeWidth={1.2} />
        </button>
      </form>
    </div>
  );
}

function Index() {
  const [metal, setMetal] = useState("18K Gold");
  const [stone, setStone] = useState("Diamond");
  const [hovered, setHovered] = useState(0);

  const price = 180000 + metal.length * 4200 + stone.length * 9100;

  return (
    <main>
      <SiteNav />
      <Hero />

      {/* Featured */}
      <Shell id="collections" label="Featured Collection" title="THE FUTURE OF FORM">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.name} delay={i * 120}>
              <article className="shine group relative overflow-hidden rounded-xl border border-border bg-card">
                <div className="overflow-hidden">
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.cat}`}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2 p-6">
                  <p className="label-xs">{p.cat}</p>
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <p className="text-sm font-light text-muted-foreground">{p.price}</p>
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-4 gap-3 p-6 opacity-0 transition-all duration-500 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <button className="glass flex items-center gap-2 rounded-full px-4 py-2 text-[0.65rem] tracking-[0.25em] uppercase">
                    <Eye className="size-3" strokeWidth={1.2} /> Quick view
                  </button>
                  <button
                    aria-label={`Add ${p.name} to wishlist`}
                    className="glass rounded-full p-2.5"
                  >
                    <Heart className="size-3.5" strokeWidth={1.2} />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Shell>

      {/* Categories */}
      <Shell id="jewelry" label="Explore" title="THE ARCHIVE">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
          {categories.map((c, i) => (
            <a
              key={c}
              href="#collections"
              className="shine group relative flex h-44 items-end bg-card p-6 transition-colors duration-500 hover:bg-secondary md:h-56"
            >
              <span className="label-xs absolute top-6 left-6">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-2xl transition-colors duration-500 group-hover:text-primary">
                {c}
              </span>
            </a>
          ))}
        </div>
      </Shell>

      {/* 3D showcase */}
      <section className="border-y border-border bg-secondary/30">
        <Shell label="Interactive Showcase" title="SEE EVERY DETAIL">
          <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
            <div
              className="glass relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl"
              role="img"
              aria-label="Interactive 360 degree jewelry viewer placeholder"
            >
              <img
                src={p2}
                alt="Sculptural gold signet rotating in a 360 degree viewer"
                loading="lazy"
                width={900}
                height={1200}
                className="h-full object-contain drop-shadow-2xl"
              />
              <div className="glass absolute bottom-6 flex items-center gap-3 rounded-full px-5 py-2.5">
                <RotateCcw className="size-3.5 text-primary" strokeWidth={1.2} />
                <span className="label-xs">Drag to rotate · Scroll to zoom</span>
              </div>
            </div>
            <div className="space-y-8">
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                A luxury configurator built for real-time inspection. The viewer is structured for a
                GLB/GLTF model to be dropped in — materials, gemstones and lighting environments are
                already wired as swappable states.
              </p>
              {[
                ["Material", ["Gold", "Silver", "Platinum"]],
                ["Gemstone", ["Diamond", "Emerald", "Sapphire"]],
                ["Lighting", ["Studio", "Atelier", "Midnight"]],
              ].map(([label, opts]) => (
                <div key={label as string}>
                  <p className="label-xs">{label as string}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(opts as string[]).map((o) => (
                      <button
                        key={o}
                        className="rounded-full border border-border px-4 py-2 text-[0.65rem] tracking-[0.2em] uppercase transition-colors hover:border-primary hover:text-primary"
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      {/* Signature editorial */}
      <Shell label="Signature" title="SIGNATURE">
        <div className="space-y-28">
          {[products[1], products[3]].map(
            (p, i) =>
              p && (
                <Reveal key={p.name}>
                  <div
                    className={`grid items-center gap-12 lg:grid-cols-2 ${
                      i % 2 ? "lg:[&>figure]:order-2" : ""
                    }`}
                  >
                    <figure className="shine overflow-hidden rounded-xl">
                      <img
                        src={p.img}
                        alt={p.name}
                        loading="lazy"
                        width={900}
                        height={1200}
                        className="aspect-[4/5] w-full object-cover"
                      />
                    </figure>
                    <div className="max-w-md space-y-6">
                      <SectionLabel>{p.cat}</SectionLabel>
                      <h3 className="font-display text-4xl md:text-5xl">{p.name}</h3>
                      <p className="text-sm font-light leading-relaxed text-muted-foreground">
                        Conceived as a study in light, this piece is hand-set over eleven days. Its
                        geometry was refined through hundreds of digital iterations before a single
                        gram of metal was cast.
                      </p>
                      <dl className="grid grid-cols-3 gap-6 border-t border-border pt-6 text-sm font-light">
                        <div>
                          <dt className="label-xs">Material</dt>
                          <dd className="mt-2">Platinum 950</dd>
                        </div>
                        <div>
                          <dt className="label-xs">Gemstone</dt>
                          <dd className="mt-2">{i ? "Emerald" : "Diamond"}</dd>
                        </div>
                        <div>
                          <dt className="label-xs">Price</dt>
                          <dd className="mt-2">{p.price}</dd>
                        </div>
                      </dl>
                      <LuxButton variant="ghost">Explore</LuxButton>
                    </div>
                  </div>
                </Reveal>
              ),
          )}
        </div>
      </Shell>

      {/* Try on + Concierge */}
      <section className="border-y border-border bg-secondary/30">
        <Shell label="Virtual Atelier" title="SEE IT ON YOU">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="glass flex aspect-[4/3] flex-col items-center justify-center gap-6 rounded-2xl text-center">
                <Camera className="size-7 text-primary" strokeWidth={1} />
                <p className="max-w-xs text-sm font-light text-muted-foreground">
                  Preview rings, earrings, necklaces, bracelets and watches through your camera.
                  AR-ready interface.
                </p>
                <LuxButton variant="ghost">Enable Camera</LuxButton>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <Concierge />
            </Reveal>
          </div>
        </Shell>
      </section>

      {/* Bespoke timeline */}
      <Shell id="bespoke" label="Bespoke" title="MADE FOR YOU">
        <ol className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-5">
          {steps.map(([n, t, d]) => (
            <li key={n} className="group bg-card p-8 transition-colors duration-500 hover:bg-secondary">
              <p className="font-display text-3xl text-primary/70 transition-colors group-hover:text-primary">
                {n}
              </p>
              <h3 className="mt-4 text-[0.7rem] tracking-[0.3em] uppercase">{t}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12">
          <LuxButton>Begin Your Bespoke Journey</LuxButton>
        </div>
      </Shell>

      {/* Customizer */}
      <section className="border-y border-border bg-secondary/30">
        <Shell label="Configurator" title="CREATE YOUR PIECE">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="glass flex items-center justify-center overflow-hidden rounded-2xl p-10">
              <img
                src={p2}
                alt="Live preview of a customized gold ring"
                loading="lazy"
                width={900}
                height={1200}
                className="max-h-[380px] w-auto object-contain"
                style={{ filter: stone === "Emerald" ? "hue-rotate(80deg)" : undefined }}
              />
            </div>
            <div className="space-y-8">
              <div>
                <p className="label-xs">Metal</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["18K Gold", "White Gold", "Platinum", "Rose Gold"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setMetal(m)}
                      aria-pressed={metal === m}
                      className={`rounded-full border px-4 py-2 text-[0.65rem] tracking-[0.2em] uppercase transition-colors ${
                        metal === m
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="label-xs">Gemstone</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Diamond", "Emerald", "Sapphire", "Ruby"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStone(s)}
                      aria-pressed={stone === s}
                      className={`rounded-full border px-4 py-2 text-[0.65rem] tracking-[0.2em] uppercase transition-colors ${
                        stone === s
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="engraving" className="label-xs">
                  Engraving
                </label>
                <input
                  id="engraving"
                  placeholder="Up to 18 characters"
                  maxLength={18}
                  className="mt-3 w-full border-b border-border bg-transparent pb-2 text-sm font-light outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-end justify-between border-t border-border pt-6">
                <div>
                  <p className="label-xs">Estimated</p>
                  <p className="mt-2 font-display text-3xl text-gilded">
                    ₹{price.toLocaleString("en-IN")}
                  </p>
                </div>
                <LuxButton>Create Your Piece</LuxButton>
              </div>
            </div>
          </div>
        </Shell>
      </section>

      {/* Materials */}
      <Shell label="The Materials" title="THE MATERIALS">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {materials.map((m, i) => (
            <button
              key={m.n}
              onMouseEnter={() => setHovered(i)}
              onFocus={() => setHovered(i)}
              className="group bg-card p-8 text-left transition-colors duration-500 hover:bg-secondary"
            >
              <h3 className="font-display text-3xl group-hover:text-primary">{m.n}</h3>
              <div
                className={`mt-4 space-y-2 text-sm font-light text-muted-foreground transition-opacity duration-500 ${
                  hovered === i ? "opacity-100" : "opacity-60"
                }`}
              >
                <p>Origin — {m.o}</p>
                <p>Character — {m.c}</p>
                <p>Quality — {m.q}</p>
              </div>
            </button>
          ))}
        </div>
      </Shell>

      {/* Sustainability */}
      <section className="border-y border-border bg-secondary/30">
        <Shell label="Sustainability" title="LUXURY WITH PURPOSE.">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Recycled metals", 92],
              ["Traceable gemstones", 100],
              ["Plastic-free packaging", 87],
              ["Carbon offset production", 74],
            ].map(([label, val], i) => (
              <Reveal key={label as string} delay={i * 100}>
                <p className="font-display text-5xl text-gilded">{val as number}%</p>
                <p className="mt-3 text-sm font-light text-muted-foreground">{label as string}</p>
                <div className="mt-4 h-px w-full bg-border">
                  <div className="h-px bg-primary" style={{ width: `${val as number}%` }} />
                </div>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      {/* Story */}
      <Shell id="our-story" label="Brand Philosophy" title="CRAFTED FOR TOMORROW.">
        <div className="grid gap-12 lg:grid-cols-2">
          <p className="max-w-lg text-lg font-light leading-relaxed text-muted-foreground">
            Aurelune began with a question: what does an heirloom look like when it is designed for a
            century that has not arrived yet? Our answer lives in the tension between hand and
            machine — stones traced to their origin, metals reborn from recycled sources, geometry
            resolved by computation and finished by human patience.
          </p>
          <img
            src={packaging}
            alt="Aurelune signature packaging with certificate of authenticity"
            loading="lazy"
            width={1400}
            height={900}
            className="rounded-xl object-cover"
          />
        </div>
        <p className="mt-16 max-w-2xl font-display text-3xl leading-snug md:text-4xl">
          The experience begins before you open it.
        </p>
      </Shell>

      {/* Journal + Atelier */}
      <section className="border-t border-border bg-secondary/30">
        <Shell id="new-arrivals" label="Journal" title="THE JOURNAL">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              ["Gemstones", "Reading light: the anatomy of an ideal cut"],
              ["Behind the Craft", "Sixty hours inside the Aurelune atelier"],
              ["Culture", "Why the future of luxury is traceable"],
            ].map(([cat, title], i) => (
              <Reveal key={title} delay={i * 120}>
                <article className="shine rounded-xl border border-border bg-card p-8">
                  <p className="label-xs">{cat}</p>
                  <h3 className="mt-5 font-display text-2xl leading-snug">{title}</h3>
                  <p className="mt-5 text-sm font-light text-muted-foreground">Read the story →</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-24 grid gap-8 rounded-xl border border-border bg-card p-10 lg:grid-cols-2">
            <div>
              <SectionLabel>Store Locator</SectionLabel>
              <h3 className="mt-5 font-display text-3xl">Find your nearest atelier</h3>
              <label htmlFor="loc" className="sr-only">
                Search location
              </label>
              <input
                id="loc"
                placeholder="City or postcode"
                className="mt-8 w-full border-b border-border bg-transparent pb-2 text-sm font-light outline-none focus:border-primary"
              />
              <div className="mt-6">
                <LuxButton variant="ghost">Book a Private Consultation</LuxButton>
              </div>
            </div>
            <ul className="space-y-6">
              {[
                ["Mumbai — Kala Ghoda", "Mon–Sat · 11:00–20:00", "+91 22 4000 1200"],
                ["New Delhi — Chanakyapuri", "Mon–Sat · 11:00–20:00", "+91 11 4000 1300"],
                ["Paris — Rue Saint-Honoré", "Tue–Sat · 10:00–19:00", "+33 1 40 00 14 00"],
              ].map(([n, h, t]) => (
                <li key={n} className="border-b border-border pb-5">
                  <p className="font-display text-xl">{n}</p>
                  <p className="mt-1 text-sm font-light text-muted-foreground">
                    {h} · {t}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <p className="font-display text-xl tracking-[0.45em] text-gilded">AURELUNE</p>
              <p className="mt-6 max-w-xs font-display text-2xl leading-snug">
                Enter the world of the extraordinary.
              </p>
              <form className="mt-8 flex max-w-sm items-center gap-4 border-b border-border pb-2">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm font-light outline-none"
                />
                <button className="label-xs whitespace-nowrap text-primary">Subscribe</button>
              </form>
            </div>
            {[
              ["Explore", ["Collections", "New Arrivals", "Best Sellers", "Bespoke"]],
              ["Client Services", ["Contact", "Shipping", "Returns", "Size Guide", "FAQ"]],
              ["Brand", ["Our Story", "Craftsmanship", "Sustainability", "Journal"]],
            ].map(([h, items]) => (
              <nav key={h as string} aria-label={h as string}>
                <p className="label-xs">{h as string}</p>
                <ul className="mt-6 space-y-3 text-sm font-light text-muted-foreground">
                  {(items as string[]).map((it) => (
                    <li key={it}>
                      <a href="#collections" className="transition-colors hover:text-primary">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
          <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-8">
            <p className="label-xs">© 2049 Aurelune Maison</p>
            <ul className="flex gap-6">
              {["Instagram", "Pinterest", "YouTube", "Facebook"].map((s) => (
                <li key={s}>
                  <a href="#" className="label-xs transition-colors hover:text-primary">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </main>
  );
}
