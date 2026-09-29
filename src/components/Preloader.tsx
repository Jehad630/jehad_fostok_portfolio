import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { profile } from '../data/portfolio';
import { useSmoothScroll } from '../hooks/useLenis';
import { useReducedMotion } from '../hooks/useReducedMotion';

type Tone = 'cmd' | 'muted' | 'ok' | 'fg';

const LINES: { text: string; tone: Tone }[] = [
  { text: '$ flutter run -d portfolio --release', tone: 'cmd' },
  { text: 'Launching lib/main.dart on Portfolio in release mode...', tone: 'muted' },
  { text: 'Resolving dependencies...', tone: 'muted' },
  { text: 'Got dependencies! flutter_bloc · supabase_flutter · get_it', tone: 'fg' },
  { text: "Running Gradle task 'assembleRelease'...", tone: 'muted' },
  { text: '✓ Built build/app/outputs/flutter-apk/app-release.apk', tone: 'ok' },
  { text: 'Syncing files to device Portfolio...', tone: 'muted' },
  { text: 'Rendering PhoneCluster(count: 5) · UiFragments · CodeLayer', tone: 'fg' },
  { text: 'Flutter run key commands. r Hot reload. R Hot restart.', tone: 'muted' },
  { text: `✓ Ready — ${profile.name} · ${profile.title}`, tone: 'ok' },
];

const toneClass: Record<Tone, string> = {
  cmd: 'text-fg',
  muted: 'text-muted',
  ok: 'text-accent',
  fg: 'text-fg/80',
};

/** Hard cap so the page never waits forever on a slow / failed WebGL start. */
const MAX_WAIT = 7000;

interface PreloaderProps {
  ready: boolean;
  onDone: () => void;
}

/** Terminal-style boot sequence that covers the lazy-loaded 3D scene. */
export function Preloader({ ready, onDone }: PreloaderProps) {
  const reducedMotion = useReducedMotion();
  const { lenis } = useSmoothScroll();
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(true);
  const readyRef = useRef(ready);
  readyRef.current = ready;
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  // Always start at the top, with scroll locked while booting.
  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = 'hidden';
    lenis?.stop();
    return () => {
      html.style.overflow = '';
      lenis?.start();
    };
  }, [open, lenis]);

  useEffect(() => {
    // Purely time-based so a slow first render can't stall the bar:
    // ease to 90% over `duration`, then 90 → 100% in `finish` ms once the scene is ready.
    const duration = reducedMotion ? 400 : 2200;
    const finish = reducedMotion ? 150 : 450;
    const start = performance.now();
    let finishAt = 0;
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      let value = (1 - Math.pow(1 - t, 3)) * 90;
      if (!finishAt && t >= 1 && (readyRef.current || elapsed > MAX_WAIT)) finishAt = now;
      if (finishAt) value = 90 + Math.min((now - finishAt) / finish, 1) * 10;
      setProgress(value);

      if (value >= 100) {
        window.setTimeout(() => {
          setOpen(false);
          doneRef.current();
        }, reducedMotion ? 100 : 450);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  // The final "✓ Ready" line only appears at 100%.
  const shown = progress >= 100 ? LINES.length : Math.max(1, Math.ceil((progress / 90) * (LINES.length - 1)));
  const pct = Math.floor(progress);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${pct}%`}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg px-4"
          exit={
            reducedMotion
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { clipPath: 'inset(0 0 100% 0)', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }
          }
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          <div className="w-full max-w-2xl">
            <div className="overflow-hidden rounded-xl border border-line bg-surface/80 shadow-[0_40px_120px_-40px_rgb(124_131_253/0.25)]">
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#F59CB2]/70" />
                <span className="size-2.5 rounded-full bg-[#F5C77E]/70" />
                <span className="size-2.5 rounded-full bg-accent/70" />
                <span className="ml-3 font-mono text-[11px] text-muted">zsh — ~/portfolio</span>
              </div>
              <ol className="min-h-[19rem] space-y-1.5 p-5 font-mono text-[11px] leading-relaxed sm:text-xs">
                {LINES.slice(0, shown).map((line, i) => (
                  <li key={line.text} className={toneClass[line.tone]}>
                    {line.text}
                    {i === shown - 1 && <span aria-hidden className="caret ml-1" />}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex items-center gap-4 font-mono text-xs text-muted">
              <div className="h-px flex-1 overflow-hidden bg-line">
                <div className="h-full bg-accent" style={{ width: `${progress}%` }} />
              </div>
              <span className="w-10 text-right tabular-nums text-fg">{pct}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
