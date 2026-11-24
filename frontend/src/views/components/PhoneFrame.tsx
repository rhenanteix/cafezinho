import type { ReactNode } from "react";

export function PhoneFrame({ children, url }: { children: ReactNode; url?: string }) {
  return (
    <div className="mx-auto w-full max-w-[360px] rounded-[42px] bg-espresso p-2.5 shadow-lift ring-1 ring-white/10">
      <div className="overflow-hidden rounded-[32px] bg-cream">
        <div className="flex items-center justify-center bg-white/70 px-4 py-2.5">
          <span className="truncate rounded-full bg-brand-50 px-3 py-1 text-[11px] font-semibold text-brand-700">
            {url ?? "paguemeucafezinho.com/seunome"}
          </span>
        </div>
        <div className="max-h-[560px] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
