"use client";

import { useSearchParams } from "next/navigation";
import { Check, Copy, ExternalLink, Eye, LoaderCircle, LogOut, MousePointerClick, PartyPopper, Save } from "lucide-react";
import { LIMITS } from "@/models/entities";
import { useDashboardViewModel } from "@/viewmodels/useDashboardViewModel";
import { AvatarUploader } from "../components/AvatarUploader";
import { Button } from "../components/Button";
import { CreatorCard } from "../components/CreatorCard";
import { TextAreaField, TextField } from "../components/Field";
import { Logo } from "../components/Logo";
import { PaymentLinksEditor } from "../components/PaymentLinksEditor";
import { PhoneFrame } from "../components/PhoneFrame";
import { SlugField } from "../components/SlugField";
import { SocialLinksEditor } from "../components/SocialLinksEditor";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white/70 p-6 ring-1 ring-black/5 sm:p-7">
      <h2 className="text-lg font-bold">{title}</h2>
      {description && <p className="mt-1 text-sm text-mocha">{description}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export function DashboardView() {
  const vm = useDashboardViewModel();
  const welcome = useSearchParams().get("bemvindo") === "1";
  const { form, errors, user } = vm;

  if (vm.loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoaderCircle className="size-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28">
      <header className="border-b border-black/5 bg-white/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <Button variant="ghost" size="sm" onClick={vm.logout} icon={<LogOut className="size-4" />}>
            Sair
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        {welcome && (
          <div className="mb-6 flex animate-fade-up items-start gap-3 rounded-2xl bg-emerald-50 p-4 text-emerald-900 ring-1 ring-emerald-100">
            <PartyPopper className="mt-0.5 size-5 shrink-0 text-emerald-600" />
            <div className="text-sm">
              <p className="font-bold">Sua página está no ar!</p>
              <p>Copie o link abaixo e coloque na bio das suas redes.</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-mocha">Olá, {user.name.split(" ")[0]}</p>
            <h1 className="text-3xl font-extrabold tracking-tight">Seu painel</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-4 shadow-soft ring-1 ring-black/5">
            <span className="truncate text-sm font-semibold">{vm.pageUrl.replace(/^https?:\/\//, "")}</span>
            <Button size="sm" variant="secondary" onClick={vm.copyLink} icon={vm.copied ? <Check className="size-4 text-emerald-600" /> : <Copy className="size-4" />}>
              {vm.copied ? "Copiado" : "Copiar"}
            </Button>
            <Button size="sm" href={`/${user.slug}`} icon={<ExternalLink className="size-4" />}>
              Ver
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:max-w-md">
          <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5">
            <Eye className="size-5 text-brand-500" />
            <p className="mt-3 text-3xl font-extrabold tabular-nums">{user.stats.views}</p>
            <p className="text-sm text-mocha">visitas na página</p>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-soft ring-1 ring-black/5">
            <MousePointerClick className="size-5 text-brand-500" />
            <p className="mt-3 text-3xl font-extrabold tabular-nums">{user.stats.clicks}</p>
            <p className="text-sm text-mocha">cliques em pagar</p>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <Section title="Perfil" description="Como você aparece para seus apoiadores.">
              <AvatarUploader value={form.avatarUrl} name={form.name} onChange={(url) => vm.setField("avatarUrl", url)} />
              <TextField id="name" label="Nome" value={form.name} maxLength={LIMITS.name} onChange={(e) => vm.setField("name", e.target.value)} error={errors.name} />
              <TextField id="area" label="O que você faz" value={form.area} maxLength={LIMITS.area} showCount onChange={(e) => vm.setField("area", e.target.value)} error={errors.area} />
              <TextAreaField id="bio" label="Sua mensagem" value={form.bio} maxLength={LIMITS.bio} onChange={(e) => vm.setField("bio", e.target.value)} error={errors.bio} />
            </Section>

            <Section title="Pagamentos" description="Até 3 botões. Os cliques de cada botão são contados abaixo.">
              <SlugField value={form.slug} onChange={vm.setSlug} status={vm.slugCheck.status} message={vm.slugCheck.message} error={errors.slug} />
              {user.paymentLinks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {user.paymentLinks.map((l) => (
                    <span key={l.id} className="rounded-full bg-latte/70 px-3 py-1 text-xs font-medium text-mocha">
                      {l.label}: <strong className="text-espresso">{l.clicks ?? 0} cliques</strong>
                    </span>
                  ))}
                </div>
              )}
              <PaymentLinksEditor links={form.paymentLinks} errors={errors} onUpdate={vm.updateLink} onAdd={vm.addLink} onRemove={vm.removeLink} />
            </Section>

            <Section title="Redes sociais">
              <SocialLinksEditor socials={form.socials} errors={errors} onChange={vm.setSocial} defaultOpen />
            </Section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-mocha/60">Prévia</p>
              <PhoneFrame url={`cafezinho.app/${form.slug}`}>
                <CreatorCard creator={vm.preview} preview />
              </PhoneFrame>
            </div>
          </aside>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-4 px-5 py-3">
          {vm.feedback && (
            <p className={`text-sm font-medium ${vm.feedback.type === "success" ? "text-emerald-700" : "text-red-600"}`}>{vm.feedback.message}</p>
          )}
          <Button onClick={vm.save} loading={vm.saving} icon={<Save className="size-4" />}>
            Salvar alterações
          </Button>
        </div>
      </div>
    </div>
  );
}
