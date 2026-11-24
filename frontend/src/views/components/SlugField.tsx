"use client";

import { Check, LoaderCircle, X } from "lucide-react";
import type { SlugStatus } from "@/viewmodels/useSlugAvailability";
import { FieldWrapper } from "./Field";

interface Props {
  value: string;
  onChange: (value: string) => void;
  status: SlugStatus;
  message?: string;
  error?: string;
}

export function SlugField({ value, onChange, status, message, error }: Props) {
  const host = typeof window !== "undefined" ? window.location.host : "paguemeucafezinho.com";
  const shownError = error ?? message;
  return (
    <FieldWrapper
      label="Endereço da sua página"
      htmlFor="slug"
      error={shownError}
      hint={status === "available" ? <span className="font-medium text-emerald-600">Ótimo, esse endereço está livre!</span> : "Use letras, números e hífen. Ex: maria-desenha"}
    >
      <div
        className={`flex items-center overflow-hidden rounded-xl bg-white ring-1 transition focus-within:ring-2 ${
          shownError ? "ring-red-300 focus-within:ring-red-400" : status === "available" ? "ring-emerald-300 focus-within:ring-emerald-400" : "ring-black/10 focus-within:ring-brand-400"
        }`}
      >
        <span className="select-none whitespace-nowrap pl-4 text-[15px] text-mocha/60">{host}/</span>
        <input
          id="slug"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="seunome"
          autoComplete="off"
          className="w-full bg-transparent py-3 pr-2 text-[15px] font-semibold outline-none"
        />
        <span className="pr-4">
          {status === "checking" && <LoaderCircle className="size-4 animate-spin text-mocha/60" />}
          {status === "available" && <Check className="size-4 text-emerald-600" />}
          {status === "unavailable" && <X className="size-4 text-red-500" />}
        </span>
      </div>
    </FieldWrapper>
  );
}
