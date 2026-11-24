"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FieldErrors, SignupForm } from "@/models/entities";
import { formToPreview, newLinkDraft, slugify, toPayload } from "@/models/payment";
import { authService } from "@/models/services/authService";
import { ApiError } from "@/models/services/httpClient";
import { useProfileFormState, validatePayments, validateProfileBasics } from "./useProfileFormState";
import { useSlugAvailability } from "./useSlugAvailability";

export const SIGNUP_STEPS = [
  { id: "conta", title: "Sua conta", description: "Como você vai entrar" },
  { id: "perfil", title: "Seu perfil", description: "O que seus apoiadores verão" },
  { id: "pagamentos", title: "Pagamentos", description: "Seus links e endereço" },
] as const;

const STEP_FIELDS: ((key: string) => boolean)[] = [
  (k) => ["email", "password"].includes(k),
  (k) => ["name", "area", "bio", "avatarUrl"].includes(k) || k.startsWith("socials"),
  () => true,
];

const initialForm: SignupForm = {
  name: "",
  area: "",
  bio: "",
  avatarUrl: null,
  slug: "",
  socials: {},
  paymentLinks: [newLinkDraft(500)],
  email: "",
  password: "",
  heardFrom: "",
  acceptedTerms: false,
};

function validateAccount(form: SignupForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Informe um e-mail válido";
  if (form.password.length < 6) errors.password = "Use pelo menos 6 caracteres";
  return errors;
}

export function useSignupViewModel() {
  const router = useRouter();
  const state = useProfileFormState(initialForm);
  const { form, setErrors, setField } = state;
  const [step, setStep] = useState(0);
  const [slugTouched, setSlugTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string>();
  const slugCheck = useSlugAvailability(form.slug);

  function setName(name: string) {
    setField("name", name);
    if (!slugTouched) setField("slug", slugify(name).replace(/-$/, ""));
  }

  function setSlug(slug: string) {
    setSlugTouched(true);
    setField("slug", slugify(slug));
  }

  const validators = [validateAccount, validateProfileBasics, (f: SignupForm) => {
    const errors = validatePayments(f);
    if (slugCheck.status === "unavailable") errors.slug = slugCheck.message ?? "Endereço indisponível";
    if (!f.acceptedTerms) errors.acceptedTerms = "Você precisa aceitar os termos";
    return errors;
  }];

  function next() {
    const errors = validators[step](form);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      setStep((s) => Math.min(s + 1, SIGNUP_STEPS.length - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
  }

  function goTo(target: number) {
    if (target < step) setStep(target);
  }

  async function submit() {
    const errors = validators[2](form);
    setErrors(errors);
    if (Object.keys(errors).length) return;

    setSubmitting(true);
    setFormError(undefined);
    try {
      await authService.register({
        ...toPayload(form),
        email: form.email,
        password: form.password,
        heardFrom: form.heardFrom || null,
        acceptedTerms: form.acceptedTerms,
      });
      router.push("/painel?bemvindo=1");
    } catch (e) {
      if (e instanceof ApiError) {
        setErrors(e.fields);
        setFormError(e.message);
        const keys = Object.keys(e.fields);
        const firstStep = STEP_FIELDS.findIndex((match) => keys.some(match));
        if (firstStep >= 0 && firstStep < step) setStep(firstStep);
      } else {
        setFormError("Algo deu errado. Tente novamente.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return {
    ...state,
    step,
    steps: SIGNUP_STEPS,
    isLastStep: step === SIGNUP_STEPS.length - 1,
    preview: formToPreview(form),
    slugCheck,
    submitting,
    formError,
    setName,
    setSlug,
    next,
    back,
    goTo,
    submit,
  };
}
