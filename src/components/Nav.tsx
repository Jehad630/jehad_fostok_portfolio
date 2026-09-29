import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navigation, profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/useLenis';

export function Nav() {
  const { scrollTo } = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollTo(`#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-500 ${
        scrolled ? 'border-b border-line bg-bg/70 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-page flex h-16 items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            go('top');
          }}
          className="font-mono text-sm text-fg"
        >
          <span className="text-accent">~/</span>
          {profile.firstName.toLowerCase()}-{profile.lastName.toLowerCase()}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navigation.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                className="group font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                <span className="text-accent/70 group-hover:text-accent">{String(i + 2).padStart(2, '0')}.</span>{' '}
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-line text-fg md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="container-page flex flex-col gap-1 border-t border-line bg-bg/95 py-4 md:hidden">
          {navigation.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
                className="block py-3 font-mono text-sm text-muted hover:text-fg"
              >
                <span className="text-accent">{String(i + 2).padStart(2, '0')}.</span> {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
