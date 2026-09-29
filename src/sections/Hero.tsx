import { motion, type Variants } from 'framer-motion';
import { ArrowDownRight, Download, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';
import { useBooted } from '../hooks/useBoot';
import { useSmoothScroll } from '../hooks/useLenis';

const ease = [0.16, 1, 0.3, 1] as const;

const line: Variants = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: '0%', transition: { duration: 1.2, ease, delay: 0.15 + i * 0.12 } }),
};

const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.55 + i * 0.1 } }),
};

export function Hero() {
  const { scrollTo } = useSmoothScroll();
  const booted = useBooted();
  const state = booted ? 'show' : 'hidden';

  return (
    <section id="top" aria-labelledby="hero-title" className="relative flex min-h-svh items-end pb-16 pt-32 md:pb-24">
      <div className="container-page">
        <div className="max-w-3xl">
          <motion.p variants={fade} custom={0} initial="hidden" animate={state} className="font-mono text-xs text-muted">
            <span className="text-accent">01</span> <span className="text-muted/40">{'//'}</span> lib/main.dart
            <span className="caret ml-2" aria-hidden />
          </motion.p>

          <h1 id="hero-title" className="mt-8 text-hero font-medium">
            {[profile.firstName, profile.lastName].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={line}
                  custom={i}
                  initial="hidden"
                  animate={state}
                  className={`block ${i === 1 ? 'text-gradient' : ''}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div variants={fade} custom={1} initial="hidden" animate={state} className="mt-8 max-w-xl">
            <p className="font-mono text-sm text-accent">{profile.title}</p>
            <p className="mt-3 text-lg leading-relaxed text-muted md:text-xl">{profile.positioning}</p>
          </motion.div>

          <motion.div variants={fade} custom={2} initial="hidden" animate={state} className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#projects');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
            >
              View Projects <ArrowDownRight size={16} />
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact');
              }}
              className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-fg transition-colors hover:border-line-strong"
            >
              Contact <Mail size={16} />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-6 py-3 text-sm text-muted backdrop-blur-sm transition-colors hover:text-fg"
            >
              Download CV <Download size={16} />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        variants={fade}
        custom={4}
        initial="hidden"
        animate={state}
        aria-hidden
        className="absolute bottom-8 right-4 hidden items-center gap-3 font-mono text-[11px] text-muted md:right-12 md:flex"
      >
        <span>scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-accent motion-safe:animate-[scrollhint_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.div>
    </section>
  );
}
