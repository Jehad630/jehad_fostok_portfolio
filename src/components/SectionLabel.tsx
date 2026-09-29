interface SectionLabelProps {
  index: number;
  path: string;
}

/** Monospace section marker, e.g. `02 // lib/about.dart` */
export function SectionLabel({ index, path }: SectionLabelProps) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs tracking-wide text-muted">
      <span className="text-accent">{String(index).padStart(2, '0')}</span>
      <span aria-hidden className="text-muted/40">
        {'//'}
      </span>
      <span>{path}</span>
      <span aria-hidden className="h-px w-12 bg-line-strong" />
    </p>
  );
}
