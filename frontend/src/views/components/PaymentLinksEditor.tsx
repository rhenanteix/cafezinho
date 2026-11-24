"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import type { FieldErrors, PaymentLinkDraft } from "@/models/entities";
import { LIMITS } from "@/models/entities";
import { AMOUNT_PRESETS, formatBRL } from "@/models/payment";
import { TextField } from "./Field";

interface Props {
  links: PaymentLinkDraft[];
  errors: FieldErrors;
  onUpdate: (key: string, patch: Partial<PaymentLinkDraft>) => void;
  onAdd: () => void;
  onRemove: (key: string) => void;
}

function AmountPicker({ value, onChange }: { value: number | null; onChange: (v: number | null) => void }) {
  const isPreset = AMOUNT_PRESETS.includes(value);
  const [custom, setCustom] = useState(!isPreset);
  const chip = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm font-semibold transition ring-1 ${
      active ? "bg-espresso text-white ring-espresso" : "bg-white text-mocha ring-black/10 hover:ring-black/25"
    }`;

  return (
    <div className="space-y-2">
      <span className="text-sm font-semibold">Valor do link</span>
      <div className="flex flex-wrap gap-2">
        {AMOUNT_PRESETS.map((preset) => (
          <button
            key={preset ?? "livre"}
            type="button"
            className={chip(!custom && value === preset)}
            onClick={() => {
              setCustom(false);
              onChange(preset);
            }}
          >
            {preset ? formatBRL(preset).replace(",00", "") : "Valor livre"}
          </button>
        ))}
        <button type="button" className={chip(custom)} onClick={() => setCustom(true)}>
          Outro
        </button>
      </div>
      {custom && (
        <div className="flex w-40 items-center rounded-xl bg-white ring-1 ring-black/10 focus-within:ring-2 focus-within:ring-brand-400">
          <span className="pl-3 text-sm text-mocha/60">R$</span>
          <input
            type="number"
            min={0.01}
            step="0.01"
            inputMode="decimal"
            aria-label="Valor personalizado"
            defaultValue={value ? value / 100 : ""}
            onChange={(e) => {
              const reais = Number(e.target.value);
              onChange(reais > 0 ? Math.round(reais * 100) : null);
            }}
            className="w-full bg-transparent px-2 py-2 text-sm outline-none"
            placeholder="20"
          />
        </div>
      )}
      <p className="text-xs text-mocha/70">Use o mesmo valor que você definiu ao criar o link no seu banco.</p>
    </div>
  );
}

export function PaymentLinksEditor({ links, errors, onUpdate, onAdd, onRemove }: Props) {
  return (
    <div className="space-y-4">
      {errors.paymentLinks && <p className="text-sm font-medium text-red-600">{errors.paymentLinks}</p>}
      {links.map((link, i) => (
        <div key={link.key} className="animate-fade-up space-y-4 rounded-2xl bg-white p-5 ring-1 ring-black/10">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-sm font-bold">
              <span className="grid size-6 place-items-center rounded-full bg-brand-100 text-xs text-brand-700">{i + 1}</span>
              Botão de pagamento
            </span>
            {links.length > 1 && (
              <button type="button" onClick={() => onRemove(link.key)} className="rounded-full p-1.5 text-mocha/60 hover:bg-black/5 hover:text-red-600" aria-label="Remover link">
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
          <AmountPicker value={link.amountCents} onChange={(amountCents) => onUpdate(link.key, { amountCents })} />
          <TextField
            id={`link-url-${i}`}
            label="Link de pagamento ou PIX"
            placeholder="https://nubank.com.br/cobrar/..."
            value={link.url}
            onChange={(e) => onUpdate(link.key, { url: e.target.value })}
            error={errors[`paymentLinks.${i}.url`]}
            hint={
              <>
                Gere no app do seu banco.{" "}
                <Link href="/como-criar-link" target="_blank" className="font-semibold text-brand-600 hover:underline">
                  Ver passo a passo
                </Link>
              </>
            }
          />
          <TextField
            id={`link-label-${i}`}
            label="Texto do botão"
            value={link.label}
            maxLength={LIMITS.label}
            showCount
            onChange={(e) => onUpdate(link.key, { label: e.target.value })}
            error={errors[`paymentLinks.${i}.label`]}
            hint={link.labelEdited ? undefined : "Preenchido automaticamente a partir do valor — edite se quiser."}
          />
        </div>
      ))}
      {links.length < LIMITS.links && (
        <button
          type="button"
          onClick={onAdd}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-black/10 py-4 text-sm font-semibold text-mocha transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        >
          <Plus className="size-4" /> Adicionar outro valor ({links.length}/{LIMITS.links})
        </button>
      )}
    </div>
  );
}
