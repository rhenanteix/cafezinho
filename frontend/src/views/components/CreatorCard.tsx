"use client";

import { ArrowUpRight, Coffee } from "lucide-react";
import type { PaymentLink, PublicCreator } from "@/models/entities";
import { Avatar } from "./Avatar";
import { SocialIcons } from "./SocialIcons";

interface Props {
  creator: PublicCreator;
  onLinkClick?: (link: PaymentLink) => void;
  preview?: boolean;
}

export function CreatorCard({ creator, onLinkClick, preview }: Props) {
  const links = creator.paymentLinks.filter((l) => preview || l.url);
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white shadow-lift ring-1 ring-black/5">
      <div className="h-24 bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600">
        <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.35),transparent_45%)]" />
      </div>
      <div className="-mt-12 flex flex-col items-center px-6 pb-7 text-center">
        <Avatar src={creator.avatarUrl} name={creator.name || "Seu nome"} />
        <h1 className="mt-3 text-xl font-extrabold tracking-tight">{creator.name || "Seu nome"}</h1>
        <p className="mt-0.5 text-sm font-medium text-brand-600">{creator.area || "O que você faz"}</p>
        <p className="mt-3 max-w-xs whitespace-pre-line text-sm leading-relaxed text-mocha">
          {creator.bio || "Uma frase curta contando quem você é e por que apoiar seu trabalho."}
        </p>
        <div className="mt-4">
          <SocialIcons socials={creator.socials} interactive={!preview} />
        </div>

        <div className="mt-6 w-full space-y-2.5">
          {links.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-black/10 px-4 py-4 text-sm text-mocha/70">
              Seus botões de pagamento aparecem aqui
            </div>
          )}
          {links.map((link, i) => (
            <button
              key={link.id}
              type="button"
              disabled={preview}
              onClick={() => onLinkClick?.(link)}
              className={`group flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-3.5 text-left text-[15px] font-semibold transition-all ${
                i === 0
                  ? "bg-brand-500 text-white hover:bg-brand-600"
                  : "bg-latte/70 text-espresso hover:bg-brand-100"
              } ${preview ? "cursor-default" : "hover:-translate-y-0.5 hover:shadow-soft"}`}
            >
              <span className="flex items-center gap-3">
                <Coffee className="size-5 shrink-0" />
                <span className="line-clamp-2 leading-snug">{link.label || "Pagar um café"}</span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
