import { Globe } from "lucide-react";
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaSpotify, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import type { ComponentType } from "react";
import type { SocialKey, Socials } from "@/models/entities";
import { SOCIAL_KEYS } from "@/models/entities";

export const SOCIAL_META: Record<SocialKey, { label: string; icon: ComponentType<{ className?: string }>; placeholder: string }> = {
  instagram: { label: "Instagram", icon: FaInstagram, placeholder: "instagram.com/seuperfil" },
  youtube: { label: "YouTube", icon: FaYoutube, placeholder: "youtube.com/@seucanal" },
  tiktok: { label: "TikTok", icon: FaTiktok, placeholder: "tiktok.com/@seuperfil" },
  linkedin: { label: "LinkedIn", icon: FaLinkedin, placeholder: "linkedin.com/in/seuperfil" },
  x: { label: "X", icon: FaXTwitter, placeholder: "x.com/seuperfil" },
  facebook: { label: "Facebook", icon: FaFacebook, placeholder: "facebook.com/seuperfil" },
  discord: { label: "Discord", icon: FaDiscord, placeholder: "discord.gg/seuconvite" },
  spotify: { label: "Spotify", icon: FaSpotify, placeholder: "open.spotify.com/..." },
  website: { label: "Site", icon: Globe, placeholder: "seusite.com.br" },
};

function href(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function SocialIcons({ socials, interactive = true }: { socials: Socials; interactive?: boolean }) {
  const items = SOCIAL_KEYS.filter((k) => socials[k]);
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {items.map((key) => {
        const { icon: Icon, label } = SOCIAL_META[key];
        const cls = "grid size-10 place-items-center rounded-full bg-latte/70 text-mocha transition hover:bg-brand-100 hover:text-brand-700";
        return interactive ? (
          <a key={key} href={href(socials[key]!)} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
            <Icon className="size-[18px]" />
          </a>
        ) : (
          <span key={key} aria-label={label} className={cls}>
            <Icon className="size-[18px]" />
          </span>
        );
      })}
    </div>
  );
}
