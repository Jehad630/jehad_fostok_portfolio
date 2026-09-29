import { Section } from '../components/Section';
import { TiltCard } from '../components/TiltCard';
import { skills } from '../data/portfolio';

export function Skills() {
  return (
    <Section id="skills" index={3} path="lib/widgets/skills.dart" title="Skills & Stack">
      <div className="grid gap-4 md:grid-cols-2">
        {skills.map((cat) => (
          <TiltCard key={cat.id} max={5} className="rounded-2xl">
            <div className="p-6 [transform-style:preserve-3d]">
              <h3 className="font-mono text-sm text-accent [transform:translateZ(30px)]">{cat.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2 [transform:translateZ(18px)]">
                {cat.items.map((item) => (
                  <li key={item} className="rounded-full border border-line bg-bg/40 px-3 py-1 text-sm text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
