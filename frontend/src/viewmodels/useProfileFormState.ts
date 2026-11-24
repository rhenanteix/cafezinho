"use client";

import { useCallback, useState } from "react";
import type { FieldErrors, PaymentLinkDraft, ProfileForm, SocialKey } from "@/models/entities";
import { LIMITS } from "@/models/entities";
import { defaultLabel, newLinkDraft, nextPreset } from "@/models/payment";

export function useProfileFormState<T extends ProfileForm>(initial: T) {
  const [form, setForm] = useState<T>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});

  const setField = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const rest = { ...e };
      delete rest[key as string];
      return rest;
    });
  }, []);

  const setSocial = useCallback((key: SocialKey, value: string) => {
    setForm((f) => ({ ...f, socials: { ...f.socials, [key]: value } }));
  }, []);

  const updateLink = useCallback((key: string, patch: Partial<PaymentLinkDraft>) => {
    setForm((f) => ({
      ...f,
      paymentLinks: f.paymentLinks.map((link, i) => {
        if (link.key !== key) return link;
        const next = { ...link, ...patch };
        if ("amountCents" in patch && !next.labelEdited) next.label = defaultLabel(next.amountCents);
        if ("label" in patch) next.labelEdited = true;
        setErrors((e) => {
          const prefix = `paymentLinks.${i}.`;
          return Object.fromEntries(Object.entries(e).filter(([k]) => !k.startsWith(prefix) && k !== "paymentLinks"));
        });
        return next;
      }),
    }));
  }, []);

  const addLink = useCallback(() => {
    setForm((f) =>
      f.paymentLinks.length >= LIMITS.links
        ? f
        : { ...f, paymentLinks: [...f.paymentLinks, newLinkDraft(nextPreset(f.paymentLinks))] },
    );
  }, []);

  const removeLink = useCallback((key: string) => {
    setForm((f) => ({ ...f, paymentLinks: f.paymentLinks.filter((l) => l.key !== key) }));
  }, []);

  return { form, setForm, errors, setErrors, setField, setSocial, updateLink, addLink, removeLink };
}

export function validateProfileBasics(form: ProfileForm): FieldErrors {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = "Informe seu nome";
  if (form.area.trim().length < 2) errors.area = "Conte o que você faz";
  if (form.bio.trim().length < 10) errors.bio = "Escreva pelo menos 10 caracteres";
  return errors;
}

export function validatePayments(form: ProfileForm): FieldErrors {
  const errors: FieldErrors = {};
  if (form.slug.length < 3) errors.slug = "Escolha o endereço da sua página";
  const filled = form.paymentLinks.filter((l) => l.url.trim());
  if (filled.length === 0) errors["paymentLinks.0.url"] = "Cole pelo menos um link de pagamento";
  form.paymentLinks.forEach((link, i) => {
    if (link.url.trim() && !/^(https?:\/\/)?[^\s.]+\.[^\s]+$/i.test(link.url.trim())) {
      errors[`paymentLinks.${i}.url`] = "Esse link não parece válido";
    }
    if (link.url.trim() && !link.label.trim()) errors[`paymentLinks.${i}.label`] = "Informe o texto do botão";
  });
  return errors;
}
