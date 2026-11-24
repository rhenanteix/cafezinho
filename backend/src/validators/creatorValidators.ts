import { z } from "zod";
import { RESERVED_SLUGS, SLUG_REGEX, normalizeSlug } from "../utils/slug";

function withProtocol(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

const httpUrl = z
  .string()
  .trim()
  .min(1, "Informe o link")
  .transform(withProtocol)
  .refine((value) => {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) && url.hostname.includes(".");
    } catch {
      return false;
    }
  }, "Link inválido");

const optionalUrl = z
  .union([z.literal(""), z.null(), z.undefined(), httpUrl])
  .transform((value) => (value ? value : null));

export const slugSchema = z
  .string()
  .transform(normalizeSlug)
  .refine((value) => SLUG_REGEX.test(value), "Use de 3 a 30 caracteres: letras, números e hífen")
  .refine((value) => !RESERVED_SLUGS.has(value), "Este endereço é reservado");

export const paymentLinkSchema = z.object({
  url: httpUrl,
  label: z.string().trim().min(1, "Informe o texto do botão").max(42),
  amountCents: z.number().int().positive().max(10_000_000).nullable().optional().transform((v) => v ?? null),
});

export const socialsSchema = z
  .object({
    instagram: optionalUrl,
    youtube: optionalUrl,
    tiktok: optionalUrl,
    linkedin: optionalUrl,
    x: optionalUrl,
    facebook: optionalUrl,
    discord: optionalUrl,
    spotify: optionalUrl,
    website: optionalUrl,
  })
  .partial();

const profileFields = {
  name: z.string().trim().min(2, "Informe seu nome").max(60),
  area: z.string().trim().min(2, "Conte o que você faz").max(42),
  bio: z.string().trim().min(10, "Escreva pelo menos 10 caracteres").max(200),
  avatarUrl: z
    .string()
    .trim()
    .refine((v) => v.startsWith("/uploads/") || /^https?:\/\//.test(v), "Imagem inválida")
    .nullable()
    .optional(),
  slug: slugSchema,
  socials: socialsSchema.optional().default({}),
  paymentLinks: z.array(paymentLinkSchema).min(1, "Adicione pelo menos um link de pagamento").max(3),
};

export const registerSchema = z.object({
  ...profileFields,
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z.string().min(6, "A senha precisa de pelo menos 6 caracteres").max(100),
  heardFrom: z.string().trim().max(200).optional().nullable(),
  acceptedTerms: z.literal(true, { message: "Você precisa aceitar os termos" }),
});

export const updateProfileSchema = z.object(profileFields).partial();

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
