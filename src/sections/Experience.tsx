import { Section } from '../components/Section';
import { experience } from '../data/portfolio';

export function Experience() {
  return (
    <Section id="experience" index={4} path="lib/experience.dart" title="Experience">
      <ol className="space-y-6 border-l border-line pl-8">
        {experience.map((job) => (
          <li key={job.company} className="relative">
            <span aria-hidden className="absolute -left-[37px] top-2 size-2.5 rounded-full bg-accent" />
            <p className="font-mono text-xs text-muted">
              {job.start} – {job.end} · {job.mode} · {job.location}
            </p>
            <h3 className="mt-2 text-2xl text-fg">
              {job.company} <span className="text-muted">— {job.role}</span>
            </h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
