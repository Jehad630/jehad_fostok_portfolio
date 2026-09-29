import { Section } from '../components/Section';
import { TiltCard } from '../components/TiltCard';
import { certifications, education } from '../data/portfolio';

export function Education() {
  return (
    <Section id="education" index={6} path="lib/education.dart" title="Education & Certifications">
      <div className="grid gap-4 md:grid-cols-2">
        {education.map((e) => (
          <TiltCard key={e.degree} max={6} className="rounded-2xl">
            <div className="p-6 [transform-style:preserve-3d]">
              <p className="font-mono text-xs text-muted [transform:translateZ(15px)]">
                {e.start} – {e.end} · {e.city}, {e.country}
              </p>
              <h3 className="mt-3 text-2xl text-fg [transform:translateZ(40px)]">{e.degree}</h3>
              <p className="mt-1 text-muted [transform:translateZ(25px)]">{e.school}</p>
            </div>
          </TiltCard>
        ))}
        <TiltCard max={6} className="rounded-2xl">
          <ul className="p-6 [transform-style:preserve-3d]">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between gap-4 border-b border-line py-3 last:border-0 [transform:translateZ(20px)]"
              >
                <span className="text-fg">
                  {c.name}
                  {c.detail && <span className="text-muted"> · {c.detail}</span>}
                </span>
                <span className="font-mono text-xs text-muted">{c.year}</span>
              </li>
            ))}
          </ul>
        </TiltCard>
      </div>
    </Section>
  );
}
