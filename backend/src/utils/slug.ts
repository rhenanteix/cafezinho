export const RESERVED_SLUGS = new Set([
  "api", "uploads", "cadastro", "entrar", "painel", "como-criar-link", "sobre", "termos",
  "privacidade", "admin", "login", "logout", "_next", "static", "public", "ajuda", "contato",
]);

export const SLUG_REGEX = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;

export function normalizeSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
