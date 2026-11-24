"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Creator, ProfileForm } from "@/models/entities";
import { draftsFromLinks, formToPreview, slugify, toPayload } from "@/models/payment";
import { authService } from "@/models/services/authService";
import { creatorService } from "@/models/services/creatorService";
import { ApiError } from "@/models/services/httpClient";
import { sessionStore } from "@/models/services/sessionStore";
import { useProfileFormState, validatePayments, validateProfileBasics } from "./useProfileFormState";
import { useSlugAvailability } from "./useSlugAvailability";

const emptyForm: ProfileForm = { name: "", area: "", bio: "", avatarUrl: null, slug: "", socials: {}, paymentLinks: [] };

function toForm(user: Creator): ProfileForm {
  return {
    name: user.name,
    area: user.area,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    slug: user.slug,
    socials: Object.fromEntries(Object.entries(user.socials).map(([k, v]) => [k, v ?? ""])),
    paymentLinks: draftsFromLinks(user.paymentLinks),
  };
}

export function useDashboardViewModel() {
  const router = useRouter();
  const state = useProfileFormState(emptyForm);
  const { form, setForm, setErrors, setField } = state;
  const [user, setUser] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string }>();
  const [copied, setCopied] = useState(false);
  const slugCheck = useSlugAvailability(form.slug, user?.id, user?.slug);

  useEffect(() => {
    if (!sessionStore.get()) {
      router.replace("/entrar");
      return;
    }
    creatorService
      .me()
      .then((me) => {
        setUser(me);
        setForm(toForm(me));
      })
      .catch(() => router.replace("/entrar"))
      .finally(() => setLoading(false));
  }, [router, setForm]);

  const pageUrl = user && typeof window !== "undefined" ? `${window.location.origin}/${user.slug}` : "";

  async function save() {
    const errors = { ...validateProfileBasics(form), ...validatePayments(form) };
    if (slugCheck.status === "unavailable") errors.slug = slugCheck.message ?? "Endereço indisponível";
    setErrors(errors);
    if (Object.keys(errors).length) {
      setFeedback({ type: "error", message: "Revise os campos destacados" });
      return;
    }
    setSaving(true);
    setFeedback(undefined);
    try {
      const updated = await creatorService.update(toPayload(form));
      setUser(updated);
      setForm(toForm(updated));
      setFeedback({ type: "success", message: "Alterações salvas!" });
    } catch (e) {
      if (e instanceof ApiError) setErrors(e.fields);
      setFeedback({ type: "error", message: e instanceof ApiError ? e.message : "Erro ao salvar" });
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    await navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function logout() {
    authService.logout();
    router.push("/");
  }

  return {
    ...state,
    user,
    loading,
    saving,
    feedback,
    copied,
    pageUrl,
    slugCheck,
    preview: formToPreview(form),
    setSlug: (value: string) => setField("slug", slugify(value)),
    save,
    copyLink,
    logout,
  };
}
