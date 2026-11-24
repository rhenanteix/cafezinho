import type { ReactNode } from "react";

export function PhoneFrame({ children, url }: { children: ReactNode; url?: string }) {
  return (
    <div className="mx-auto w-full max-w-[360px] rounded-[40px] bg-espresso p-2.5 shadow-lift">
      <div className="overflow-hidden rounded-[32px] bg-cream">
        <div className="flex items-center justify-center bg-white/70 px-4 py-2.5">
          <span className="truncate rounded-full bg-latte/80 px-3 py-1 text-[11px] font-medium text-mocha">
            {url ?? "cafezinho.app/seunome"}
          </span>
        </div>
        <div className="max-h-[560px] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}
