export const SOCIAL_KEYS = [
  "instagram", "youtube", "tiktok", "linkedin", "x", "facebook", "discord", "spotify", "website",
] as const;

export type SocialKey = (typeof SOCIAL_KEYS)[number];
export type Socials = Record<SocialKey, string | null>;

export interface PaymentLink {
  id: string;
  label: string;
  url: string;
  amountCents: number | null;
  clicks?: number;
}

export interface PublicCreator {
  slug: string;
  name: string;
  area: string;
  bio: string;
  avatarUrl: string | null;
  socials: Socials;
  paymentLinks: PaymentLink[];
}

export interface Creator extends PublicCreator {
  id: string;
  email: string;
  heardFrom: string | null;
  stats: { views: number; clicks: number };
  createdAt: string;
}

export interface Session {
  token: string;
  user: Creator;
}

export interface PaymentLinkDraft {
  key: string;
  url: string;
  label: string;
  amountCents: number | null;
  labelEdited: boolean;
}

export interface ProfileForm {
  name: string;
  area: string;
  bio: string;
  avatarUrl: string | null;
  slug: string;
  socials: Partial<Record<SocialKey, string>>;
  paymentLinks: PaymentLinkDraft[];
}

export interface SignupForm extends ProfileForm {
  email: string;
  password: string;
  heardFrom: string;
  acceptedTerms: boolean;
}

export type FieldErrors = Record<string, string>;

export const LIMITS = { name: 60, area: 42, bio: 200, label: 42, links: 3 } as const;
