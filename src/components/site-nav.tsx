import { useEffect, useState } from "react";
import { Menu, Search, User, Heart, ShoppingBag, X } from "lucide-react";

const links = ["Collections", "Jewelry", "New Arrivals", "Bespoke", "Our Story"];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "glass py-3" : "py-6"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-6"
      >
        <a
          href="/"
          className="font-display text-xl tracking-[0.45em] text-gilded"
          aria-label="Aurelune home"
        >
          AURELUNE
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                className="label-xs transition-colors duration-500 hover:text-primary"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          {[
            { Icon: Search, label: "Search" },
            { Icon: User, label: "Account" },
            { Icon: Heart, label: "Wishlist" },
            { Icon: ShoppingBag, label: "Cart" },
          ].map(({ Icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="text-muted-foreground transition-colors duration-300 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Icon className="size-[18px]" strokeWidth={1.2} />
            </button>
          ))}
          <button
            className="lg:hidden text-muted-foreground hover:text-primary"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="size-5" strokeWidth={1.2} />
            ) : (
              <Menu className="size-5" strokeWidth={1.2} />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="glass mt-3 flex flex-col gap-5 px-8 py-8 lg:hidden">
          {links.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase().replace(/\s/g, "-")}`}
                onClick={() => setOpen(false)}
                className="font-display text-2xl"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
