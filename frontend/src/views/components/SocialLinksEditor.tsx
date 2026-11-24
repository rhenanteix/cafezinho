"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FieldErrors, SocialKey } from "@/models/entities";
import { SOCIAL_KEYS } from "@/models/entities";
import { SOCIAL_META } from "./SocialIcons";

interface Props {
  socials: Partial<Record<SocialKey, string>>;
  errors: FieldErrors;
  onChange: (key: SocialKey, value: string) => void;
  defaultOpen?: boolean;
}

const PRIMARY: SocialKey[] = ["instagram", "youtube", "tiktok"];

export function SocialLinksEditor({ socials, errors, onChange, defaultOpen }: Props) {
  const filledExtra = SOCIAL_KEYS.some((k) => !PRIMARY.includes(k) && socials[k]);
  const [open, setOpen] = useState(defaultOpen || filledExtra);
  const keys = open ? SOCIAL_KEYS : PRIMARY;

  return (
    <div className="space-y-3">
      <div>
        <span className="text-sm font-semibold">
          Redes sociais <span className="font-normal text-mocha/70">(opcional)</span>
        </span>
        <p className="text-xs text-mocha/70">Ajuda seus apoiadores a te encontrarem.</p>
      </div>
      <div className="space-y-2">
        {keys.map((key) => {
          const { icon: Icon, label, placeholder } = SOCIAL_META[key];
          const error = errors[`socials.${key}`];
          return (
            <div key={key}>
              <div className={`flex items-center gap-3 rounded-xl bg-white px-3 ring-1 transition focus-within:ring-2 ${error ? "ring-red-300" : "ring-black/10 focus-within:ring-brand-400"}`}>
                <Icon className="size-[18px] shrink-0 text-mocha/70" />
                <input
                  aria-label={label}
                  value={socials[key] ?? ""}
                  onChange={(e) => onChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-mocha/40"
                />
              </div>
              {error && <p className="mt-1 text-xs text-red-600">{label}: {error}</p>}
            </div>
          );
        })}
      </div>
      <button type="button" onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 hover:text-brand-700">
        {open ? "Mostrar menos" : "Mais redes (LinkedIn, X, Facebook, Discord, Spotify, site)"}
        <ChevronDown className={`size-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
