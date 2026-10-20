type Props = {
  size: number;
  /** "tile" is the full app icon; "mark" is the bar + ring on its own. */
  variant?: "tile" | "mark";
  className?: string;
};

export function Logo({ size, variant = "tile", className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {variant === "tile" && <rect width="32" height="32" rx="8.5" fill="#fff" />}
      <rect x="10.5" y="7" width="11" height="2.6" rx="1.3" fill="#d9472b" />
      <circle
        cx="16"
        cy="19.2"
        r="6.1"
        fill="none"
        stroke={variant === "tile" ? "#141414" : "#fff"}
        strokeWidth="2.8"
      />
    </svg>
  );
}
