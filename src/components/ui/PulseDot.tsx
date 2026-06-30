const SIZE_CLASSES: Record<"sm" | "md", string> = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
};

const COLOR_CLASSES: Record<"green" | "amber", string> = {
  green: "bg-green",
  amber: "bg-amber",
};

export function PulseDot({
  color = "green",
  size = "md",
}: {
  color?: "green" | "amber";
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-block rounded-full flex-shrink-0 ${SIZE_CLASSES[size]} ${COLOR_CLASSES[color]}`}
      style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }}
    />
  );
}
