"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Coffee, LoaderCircle, Share2 } from "lucide-react";
import { usePublicProfileViewModel } from "@/viewmodels/usePublicProfileViewModel";
import { Button } from "../components/Button";
import { CreatorCard } from "../components/CreatorCard";
import { Logo } from "../components/Logo";

export function PublicProfileView() {
  const { slug } = useParams<{ slug: string }>();
  const vm = usePublicProfileViewModel(slug);

  if (vm.status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="size-8 animate-spin text-brand-500" />
      </div>
    );
  }

  if (vm.status !== "ready" || !vm.creator) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <span className="grid size-16 place-items-center rounded-3xl bg-latte text-brand-600">
          <Coffee className="size-8" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold">{vm.status === "not-found" ? "Página não encontrada" : "Algo deu errado"}</h1>
        <p className="mt-2 max-w-sm text-mocha">
          {vm.status === "not-found" ? `Ninguém usa o endereço /${slug} ainda. Que tal ser você?` : "Tente recarregar a página em instantes."}
        </p>
        <div className="mt-6 flex gap-3">
          <Button href="/cadastro">Criar minha página</Button>
          <Button href="/" variant="secondary">Início</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--color-brand-100),transparent_60%)] px-4 py-10">
      <div className="animate-blob pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-fuchsia-200/50 blur-3xl" />
      <div className="animate-blob pointer-events-none absolute -right-24 bottom-10 size-72 rounded-full bg-zest-300/40 blur-3xl [animation-delay:-8s]" />
      <div className="relative mx-auto max-w-md animate-fade-up">
        <div className="mb-4 flex justify-end">
          <button onClick={vm.share} className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3.5 py-2 text-sm font-semibold text-mocha shadow-soft ring-1 ring-black/5 backdrop-blur hover:text-espresso">
            {vm.shared ? <Check className="size-4 text-emerald-600" /> : <Share2 className="size-4" />}
            {vm.shared ? "Link copiado" : "Compartilhar"}
          </button>
        </div>
        <CreatorCard creator={vm.creator} onLinkClick={vm.openLink} />
        <p className="mt-5 text-center text-xs text-mocha/70">
          O pagamento é feito direto no banco de {vm.creator.name.split(" ")[0]}. O Pague meu Cafezinho não cobra taxas.
        </p>
        <div className="mt-10 flex flex-col items-center gap-2">
          <Logo className="scale-90 opacity-80" />
          <Link href="/cadastro" className="text-sm font-semibold text-brand-600 hover:underline">
            Crie sua página grátis
          </Link>
        </div>
      </div>
    </main>
  );
}
