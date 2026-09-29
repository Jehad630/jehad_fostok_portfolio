import type { ReactNode } from 'react';
import { SectionLabel } from './SectionLabel';

interface SectionProps {
  id: string;
  index: number;
  path: string;
  title: string;
  children?: ReactNode;
  className?: string;
}

export function Section({ id, index, path, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-28 md:py-40 ${className}`}>
      <div className="container-page">
        <SectionLabel index={index} path={path} />
        <h2 id={`${id}-title`} className="mt-6 text-section font-medium text-fg">
          {title}
        </h2>
        <div className="mt-14 md:mt-20">{children}</div>
      </div>
    </section>
  );
}
