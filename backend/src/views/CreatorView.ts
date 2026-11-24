import type { PaymentLink } from "@prisma/client";
import type { UserWithLinks } from "../models/UserModel";

const SOCIAL_KEYS = [
  "instagram", "youtube", "tiktok", "linkedin", "x", "facebook", "discord", "spotify", "website",
] as const;

export type SocialKey = (typeof SOCIAL_KEYS)[number];

function socials(user: UserWithLinks) {
  return Object.fromEntries(SOCIAL_KEYS.map((key) => [key, user[key] ?? null])) as Record<SocialKey, string | null>;
}

function publicLink(link: PaymentLink) {
  return { id: link.id, label: link.label, url: link.url, amountCents: link.amountCents };
}

export const CreatorView = {
  SOCIAL_KEYS,

  public(user: UserWithLinks) {
    return {
      slug: user.slug,
      name: user.name,
      area: user.area,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      socials: socials(user),
      paymentLinks: user.paymentLinks.map(publicLink),
    };
  },

  private(user: UserWithLinks) {
    const totalClicks = user.paymentLinks.reduce((sum, link) => sum + link.clicks, 0);
    return {
      id: user.id,
      email: user.email,
      ...CreatorView.public(user),
      heardFrom: user.heardFrom,
      paymentLinks: user.paymentLinks.map((link) => ({ ...publicLink(link), clicks: link.clicks })),
      stats: { views: user.views, clicks: totalClicks },
      createdAt: user.createdAt,
    };
  },

  session(user: UserWithLinks, token: string) {
    return { token, user: CreatorView.private(user) };
  },
};
