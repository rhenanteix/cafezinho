"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, Lightbulb } from "lucide-react";
import { Button } from "../components/Button";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

const banks = [
  {
    id: "nubank",
    name: "Nubank",
    color: "bg-[#820ad1]",
    url: "https://nubank.com.br",
    steps: [
      "Abra o app do Nubank no celular",
      "Toque em “Pix” no menu",
      "Selecione “Cobrar”",
      "Defina um valor (ou deixe em aberto) e avance",
      "Toque em “Criar QR code”",
      "Copie o link gerado",
    ],
  },
  {
    id: "mercadopago",
    name: "Mercado Pago",
    color: "bg-[#00b1ea]",
    url: "https://www.mercadopago.com.br",
    steps: [
      "Abra o app do Mercado Pago",
      "Na tela principal, toque em “Cobrar com link”",
      "Adicione o valor e a descrição da cobrança",
      "Toque em “Continuar”",
      "Copie o link gerado",
    ],
  },
  {
    id: "pagbank",
    name: "PagBank",
    color: "bg-[#1bb99a]",
    url: "https://pagseguro.uol.com.br",
    steps: [
      "Abra o app do PagBank e toque em “Venda online”",
      "Toque em “Link de pagamento” e depois “Criar link de pagamento”",
      "Informe o título (ex: Um cafezinho) e avance",
      "Digite o valor e toque em “Continuar”",
      "Frete, quantidade e expiração não são necessários",
      "Confira os dados, toque em “Criar” e copie o link",
    ],
  },
  {
    id: "outros",
    name: "Outros bancos",
    color: "bg-espresso",
    url: null,
    steps: [
      "Procure no app do seu banco por “Cobrar”, “Link de pagamento” ou “Pix Cobrança”",
      "Defina um valor ou deixe em aberto",
      "Gere o link e copie",
      "Cole no Cafezinho — qualquer link https funciona",
    ],
  },
];

export function GuideView() {
  const [active, setActive] = useState(banks[0].id);
  const bank = banks.find((b) => b.id === active)!;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-4xl px-5 py-14">
        <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">Crie seu link de pagamento</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-mocha">
          Você pode ter até 3 botões na sua página. Escolha seu banco e siga o passo a passo — leva cerca de 1 minuto.
        </p>

        <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl bg-brand-50 p-4 text-sm text-brand-900 ring-1 ring-brand-100">
          <Lightbulb className="mt-0.5 size-5 shrink-0 text-brand-600" />
          <p>
            <strong>Dica:</strong> a maioria dos criadores usa R$ 5, R$ 10 e um valor livre. Crie um link para cada valor e repita o processo.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist">
          {banks.map((b) => (
            <button
              key={b.id}
              role="tab"
              aria-selected={b.id === active}
              onClick={() => setActive(b.id)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                b.id === active ? "bg-espresso text-white shadow-soft" : "bg-white text-mocha ring-1 ring-black/10 hover:ring-black/25"
              }`}
            >
              {b.name}
            </button>
          ))}
        </div>

        <div key={bank.id} className="animate-fade-up mx-auto mt-6 max-w-2xl rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/5 sm:p-9">
          <div className="flex items-center gap-3">
            <span className={`size-10 rounded-xl ${bank.color}`} />
            <h2 className="text-2xl font-bold">{bank.name}</h2>
          </div>
          <ol className="mt-6 space-y-4">
            {bank.steps.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">{i + 1}</span>
                <span className="pt-0.5 text-[15px] leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
          {bank.url && (
            <a href={bank.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700">
              Abrir site do {bank.name} <ExternalLink className="size-4" />
            </a>
          )}
        </div>

        <div className="mt-16 rounded-[32px] bg-espresso px-6 py-12 text-center text-white">
          <h2 className="text-3xl font-extrabold">Já tem seus links?</h2>
          <p className="mt-2 text-white/70">Agora é só montar sua página.</p>
          <Button href="/cadastro" size="lg" className="mt-6 flex-row-reverse" icon={<ArrowRight className="size-5" />}>
            Tudo pronto, começar
          </Button>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
