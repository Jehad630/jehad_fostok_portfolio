import { Section } from '../components/Section';
import { TiltCard } from '../components/TiltCard';
import { profile, stats } from '../data/portfolio';

export function About() {
  return (
    <Section id="about" index={2} path="lib/about.dart" title="About">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          {profile.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <TiltCard key={s.label} max={10} className="rounded-2xl">
              <div className="p-6 [transform-style:preserve-3d]">
                <dd className="font-display text-4xl text-fg [transform:translateZ(40px)]">{s.value}</dd>
                <dt className="mt-2 font-mono text-xs text-muted [transform:translateZ(20px)]">{s.label}</dt>
              </div>
            </TiltCard>
          ))}
        </dl>
      </div>
    </Section>
  );
}
