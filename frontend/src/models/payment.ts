import type { PaymentLink, PaymentLinkDraft, ProfileForm, PublicCreator, SocialKey } from "./entities";
import { SOCIAL_KEYS } from "./entities";

export const AMOUNT_PRESETS: (number | null)[] = [500, 1000, 1500, null];

export function formatBRL(cents: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })
    .format(cents / 100)
    .replace(/\u00a0/g, " ");
}

export function defaultLabel(amountCents: number | null) {
  return amountCents ? `Pagar um café (${formatBRL(amountCents)})` : "Pagar um café";
}

let keySeq = 0;
export function newLinkDraft(amountCents: number | null = 500, base?: Partial<PaymentLinkDraft>): PaymentLinkDraft {
  keySeq += 1;
  return {
    key: `link-${Date.now()}-${keySeq}`,
    url: "",
    amountCents,
    label: defaultLabel(amountCents),
    labelEdited: false,
    ...base,
  };
}

export function nextPreset(links: PaymentLinkDraft[]) {
  const used = new Set(links.map((l) => l.amountCents));
  return AMOUNT_PRESETS.find((p) => !used.has(p)) ?? null;
}

export function draftsFromLinks(links: PaymentLink[]): PaymentLinkDraft[] {
  return links.map((link) =>
    newLinkDraft(link.amountCents, {
      url: link.url,
      label: link.label,
      labelEdited: link.label !== defaultLabel(link.amountCents),
    }),
  );
}

export function toPayload(form: ProfileForm) {
  return {
    name: form.name,
    area: form.area,
    bio: form.bio,
    avatarUrl: form.avatarUrl,
    slug: form.slug,
    socials: Object.fromEntries(SOCIAL_KEYS.map((k) => [k, form.socials[k]?.trim() || null])),
    paymentLinks: form.paymentLinks
      .filter((l) => l.url.trim())
      .map(({ url, label, amountCents }) => ({ url: url.trim(), label: label.trim(), amountCents })),
  };
}

export function formToPreview(form: ProfileForm): PublicCreator {
  const socials = Object.fromEntries(
    SOCIAL_KEYS.map((k) => [k, form.socials[k]?.trim() || null]),
  ) as Record<SocialKey, string | null>;
  return {
    slug: form.slug,
    name: form.name,
    area: form.area,
    bio: form.bio,
    avatarUrl: form.avatarUrl,
    socials,
    paymentLinks: form.paymentLinks.map((l) => ({ id: l.key, label: l.label, url: l.url, amountCents: l.amountCents })),
  };
}

export function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-/, "")
    .slice(0, 30);
}

export function parseBRL(input: string) {
  const clean = input.replace(/[^\d.,]/g, "");
  const normalized = clean.includes(",") ? clean.replace(/\./g, "").replace(",", ".") : clean;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}
