/* eslint-disable @next/next/no-img-element */
export function Avatar({ src, name, size = 96 }: { src: string | null; name: string; size?: number }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
  return (
    <div
      className="grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-brand-200 to-brand-400 font-bold text-white ring-4 ring-white shadow-soft"
      style={{ width: size, height: size, fontSize: size / 2.6 }}
    >
      {src ? <img src={src} alt={name} className="size-full object-cover" /> : initials || "☕"}
    </div>
  );
}
