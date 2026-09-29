import { Section } from '../components/Section';
import { TiltCard } from '../components/TiltCard';
import { projects } from '../data/portfolio';

export function Projects() {
  return (
    <Section id="projects" index={5} path="lib/projects/" title="Selected Projects">
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <TiltCard key={p.id} className="rounded-2xl">
            <article className="p-6 [transform-style:preserve-3d]">
              <p className="font-mono text-xs text-accent [transform:translateZ(20px)]">{p.status.label}</p>
              <h3 className="mt-3 text-3xl text-fg [transform:translateZ(45px)]">{p.title}</h3>
              <p className="mt-1 text-sm text-muted [transform:translateZ(30px)]">{p.tagline}</p>
              <p className="mt-4 text-muted [transform:translateZ(15px)]">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2 [transform:translateZ(25px)]">
                {p.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
                    {s}
                  </li>
                ))}
              </ul>
            </article>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
