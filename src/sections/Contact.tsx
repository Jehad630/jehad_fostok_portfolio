import { Section } from '../components/Section';
import { links, profile } from '../data/portfolio';

export function Contact() {
  return (
    <Section id="contact" index={7} path="lib/contact.dart" title="Let’s build something.">
      <div className="flex flex-col gap-6">
        <a href={`mailto:${profile.email}`} className="w-fit font-display text-2xl text-fg underline-offset-8 hover:underline md:text-4xl">
          {profile.email}
        </a>
        <ul className="flex flex-wrap gap-3">
          {links.map((l) => (
            <li key={l.kind}>
              <a
                href={l.href}
                target={l.kind === 'email' ? undefined : '_blank'}
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-2 font-mono text-xs text-muted hover:text-fg"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="font-mono text-xs text-muted">Based in {profile.city}</p>
      </div>
    </Section>
  );
}
