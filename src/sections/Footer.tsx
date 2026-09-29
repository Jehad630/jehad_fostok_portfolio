import { builtWith, profile } from '../data/portfolio';

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col gap-3 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          <span className="text-accent">{'// built with'}</span> {builtWith.join(' · ')}
        </p>
      </div>
    </footer>
  );
}
