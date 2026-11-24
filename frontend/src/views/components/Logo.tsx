import Link from "next/link";

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <defs>
        <linearGradient id="pmc-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6a3df5" />
          <stop offset="0.6" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#c026d3" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#pmc-bg)" />
      <g className="animate-steam" style={{ transformOrigin: "20px 10px" }}>
        <path d="M20 13.2c-.9-.9-2.6-.4-2.6 1 0 1.2 1.5 2.1 2.6 2.9 1.1-.8 2.6-1.7 2.6-2.9 0-1.4-1.7-1.9-2.6-1Z" fill="#bef264" />
      </g>
      <path d="M11 19.5h15.5v4.2a6.3 6.3 0 0 1-6.3 6.3h-2.9a6.3 6.3 0 0 1-6.3-6.3v-4.2Z" fill="#fff" />
      <path d="M26.5 21h1.3a2.7 2.7 0 0 1 0 5.4h-1.8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="16.3" cy="24" r="0.95" fill="#2e1a75" />
      <circle cx="21.3" cy="24" r="0.95" fill="#2e1a75" />
      <path d="M17.6 26.1c.6.6 1.8.6 2.4 0" stroke="#2e1a75" strokeWidth="0.9" strokeLinecap="round" />
      <circle cx="14.6" cy="25.6" r="0.9" fill="#f9a8d4" opacity="0.9" />
      <circle cx="23" cy="25.6" r="0.9" fill="#f9a8d4" opacity="0.9" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label="Pague meu Cafezinho">
      <span className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
        <LogoMark />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-semibold tracking-wide text-mocha">pague meu</span>
        <span className="text-lg font-extrabold tracking-tight text-espresso">
          cafezinho<span className="text-brand-500">.</span>
        </span>
      </span>
    </Link>
  );
}
