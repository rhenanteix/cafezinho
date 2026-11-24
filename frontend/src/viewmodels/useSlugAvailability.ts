"use client";

import { useEffect, useState } from "react";
import { creatorService, type SlugAvailability } from "@/models/services/creatorService";

export type SlugStatus = "idle" | "checking" | "available" | "unavailable";

export function useSlugAvailability(slug: string, ignoreId?: string, initialSlug?: string) {
  const [result, setResult] = useState<{ slug: string; data: SlugAvailability | null }>({ slug: "", data: null });

  const skip = slug.length < 3 || slug === initialSlug;

  useEffect(() => {
    if (skip) return;
    let active = true;
    const timer = setTimeout(async () => {
      try {
        const data = await creatorService.checkSlug(slug, ignoreId);
        if (active) setResult({ slug, data });
      } catch {
        if (active) setResult({ slug, data: null });
      }
    }, 400);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [slug, ignoreId, skip]);

  let status: SlugStatus = "idle";
  if (slug === initialSlug && slug) status = "available";
  else if (!skip) status = result.slug !== slug ? "checking" : result.data?.available ? "available" : "unavailable";

  return {
    status,
    message:
      slug.length > 0 && slug.length < 3
        ? "Use pelo menos 3 caracteres"
        : status === "unavailable"
          ? (result.data?.reason ?? "Endereço indisponível")
          : undefined,
  };
}
