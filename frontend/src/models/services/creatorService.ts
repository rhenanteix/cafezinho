import type { Creator, PublicCreator } from "../entities";
import { http } from "./httpClient";
import { sessionStore } from "./sessionStore";

export interface SlugAvailability {
  slug: string;
  available: boolean;
  reason?: string;
}

export const creatorService = {
  getPublic(slug: string) {
    return http<PublicCreator>(`/creators/${encodeURIComponent(slug)}`, { cache: "no-store" });
  },
  registerClick(slug: string, linkId: string) {
    return http<{ url: string }>(`/creators/${encodeURIComponent(slug)}/links/${linkId}/click`, { method: "POST" });
  },
  checkSlug(slug: string, ignoreId?: string) {
    const query = ignoreId ? `?ignore=${ignoreId}` : "";
    return http<SlugAvailability>(`/slugs/${encodeURIComponent(slug)}/availability${query}`);
  },
  async me() {
    const user = await http<Creator>("/me", { auth: true, cache: "no-store" });
    sessionStore.updateUser(user);
    return user;
  },
  async update(payload: unknown) {
    const user = await http<Creator>("/me", { method: "PUT", auth: true, body: payload });
    sessionStore.updateUser(user);
    return user;
  },
  async uploadAvatar(file: File) {
    const form = new FormData();
    form.append("file", file);
    const { url } = await http<{ url: string }>("/uploads", { method: "POST", body: form });
    return url;
  },
};
