interface Props {
  width: number;
  height: number;
  className?: string;
}

export function AdBanner({ width, height, className = "" }: Props) {
  return (
    <div
      className={`bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center text-muted-foreground text-xs font-medium select-none ${className}`}
      style={{ width: "100%", maxWidth: width, height }}
    >
      <span>Ad Space • {width}×{height}</span>
    </div>
  );
}
