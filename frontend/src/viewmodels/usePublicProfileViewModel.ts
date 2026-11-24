"use client";

import { useEffect, useState } from "react";
import type { PaymentLink, PublicCreator } from "@/models/entities";
import { creatorService } from "@/models/services/creatorService";
import { ApiError } from "@/models/services/httpClient";

export function usePublicProfileViewModel(slug: string) {
  const [creator, setCreator] = useState<PublicCreator | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "not-found" | "error">("loading");
  const [shared, setShared] = useState(false);

  useEffect(() => {
    let active = true;
    creatorService
      .getPublic(slug)
      .then((data) => {
        if (!active) return;
        setCreator(data);
        setStatus("ready");
      })
      .catch((e) => active && setStatus(e instanceof ApiError && e.status === 404 ? "not-found" : "error"));
    return () => {
      active = false;
    };
  }, [slug]);

  function openLink(link: PaymentLink) {
    creatorService.registerClick(slug, link.id).catch(() => undefined);
    window.open(link.url, "_blank", "noopener,noreferrer");
  }

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: creator?.name, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  }

  return { creator, status, shared, openLink, share };
}
