"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Eye } from "lucide-react";
import { useState } from "react";
import { LIMITS } from "@/models/entities";
import { useSignupViewModel } from "@/viewmodels/useSignupViewModel";
import { AvatarUploader } from "../components/AvatarUploader";
import { Button } from "../components/Button";
import { CreatorCard } from "../components/CreatorCard";
import { TextAreaField, TextField } from "../components/Field";
import { Logo } from "../components/Logo";
import { PaymentLinksEditor } from "../components/PaymentLinksEditor";
import { PhoneFrame } from "../components/PhoneFrame";
import { SlugField } from "../components/SlugField";
import { SocialLinksEditor } from "../components/SocialLinksEditor";

export function SignupView() {
  const vm = useSignupViewModel();
  const { form, errors } = vm;
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen">
      <header className="border-b border-black/5 bg-white/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <p className="text-sm text-mocha">
            Já tem conta?{" "}
            <Link href="/entrar" className="font-semibold text-brand-600 hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-10 px-5 py-10 lg:grid-cols-[1fr_380px]">
        <div className="mx-auto w-full max-w-xl">
          <ol className="grid grid-cols-3 gap-2">
            {vm.steps.map((s, i) => {
              const done = i < vm.step;
              const current = i === vm.step;
              return (
                <li key={s.id}>
                  <button type="button" onClick={() => vm.goTo(i)} disabled={!done} className="w-full text-left">
                    <div className={`h-1.5 rounded-full transition-colors ${done || current ? "bg-brand-500" : "bg-black/10"}`} />
                    <div className="mt-2.5 flex items-center gap-1.5">
                      {done && <Check className="size-3.5 text-brand-600" />}
                      <span className={`text-sm font-bold ${current ? "text-espresso" : "text-mocha/60"}`}>{s.title}</span>
                    </div>
                    <span className="hidden text-xs text-mocha/60 sm:block">{s.description}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              if (vm.isLastStep) vm.submit();
              else vm.next();
            }}
          >
            <div key={vm.step} className="animate-fade-up space-y-5">
              {vm.step === 0 && (
                <>
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Vamos criar sua página</h1>
                    <p className="mt-2 text-mocha">Primeiro, seus dados de acesso. Leva menos de 3 minutos no total.</p>
                  </div>
                  <TextField id="email" type="email" label="E-mail" autoComplete="email" placeholder="voce@email.com" value={form.email} onChange={(e) => vm.setField("email", e.target.value)} error={errors.email} hint="Usado só para você entrar e editar a página." />
                  <TextField id="password" type="password" label="Senha" autoComplete="new-password" placeholder="Mínimo de 6 caracteres" value={form.password} onChange={(e) => vm.setField("password", e.target.value)} error={errors.password} />
                </>
              )}

              {vm.step === 1 && (
                <>
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Conte quem você é</h1>
                    <p className="mt-2 text-mocha">Isso aparece na sua página. Veja a prévia ao lado enquanto escreve.</p>
                  </div>
                  <TextField id="name" label="Nome" placeholder="Como você é conhecido nas redes" value={form.name} maxLength={LIMITS.name} onChange={(e) => vm.setName(e.target.value)} error={errors.name} />
                  <TextField id="area" label="O que você faz" placeholder="Ex: podcaster, artista, desenvolvedora" value={form.area} maxLength={LIMITS.area} showCount onChange={(e) => vm.setField("area", e.target.value)} error={errors.area} />
                  <TextAreaField id="bio" label="Sua mensagem" placeholder="Ex: Crio vídeos educativos para o ensino fundamental. Obrigado por apoiar meu trabalho!" value={form.bio} maxLength={LIMITS.bio} onChange={(e) => vm.setField("bio", e.target.value)} error={errors.bio} />
                  <AvatarUploader value={form.avatarUrl} name={form.name} onChange={(url) => vm.setField("avatarUrl", url)} />
                  <SocialLinksEditor socials={form.socials} errors={errors} onChange={vm.setSocial} />
                </>
              )}

              {vm.step === 2 && (
                <>
                  <div>
                    <h1 className="text-3xl font-extrabold tracking-tight">Como você quer receber</h1>
                    <p className="mt-2 text-mocha">
                      Cole até 3 links de pagamento do seu banco. Ainda não tem?{" "}
                      <Link href="/como-criar-link" target="_blank" className="font-semibold text-brand-600 hover:underline">
                        Veja como criar
                      </Link>
                      .
                    </p>
                  </div>
                  <SlugField value={form.slug} onChange={vm.setSlug} status={vm.slugCheck.status} message={vm.slugCheck.message} error={errors.slug} />
                  <PaymentLinksEditor links={form.paymentLinks} errors={errors} onUpdate={vm.updateLink} onAdd={vm.addLink} onRemove={vm.removeLink} />
                  <TextField id="heardFrom" label="Como conheceu o Cafezinho?" optional value={form.heardFrom} maxLength={200} onChange={(e) => vm.setField("heardFrom", e.target.value)} />
                  <label className={`flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4 text-sm ring-1 ${errors.acceptedTerms ? "ring-red-300" : "ring-black/10"}`}>
                    <input type="checkbox" checked={form.acceptedTerms} onChange={(e) => vm.setField("acceptedTerms", e.target.checked)} className="mt-0.5 size-4 accent-brand-500" />
                    <span>
                      Li e concordo com os{" "}
                      <Link href="/termos" target="_blank" className="font-semibold text-brand-600 hover:underline">Termos de Serviço</Link> e a{" "}
                      <Link href="/privacidade" target="_blank" className="font-semibold text-brand-600 hover:underline">Política de Privacidade</Link>.
                      {errors.acceptedTerms && <span className="mt-1 block text-xs font-medium text-red-600">{errors.acceptedTerms}</span>}
                    </span>
                  </label>
                </>
              )}
            </div>

            {vm.formError && <p className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{vm.formError}</p>}

            <div className="mt-8 flex items-center justify-between gap-3">
              {vm.step > 0 ? (
                <Button type="button" variant="ghost" onClick={vm.back} icon={<ArrowLeft className="size-4" />}>
                  Voltar
                </Button>
              ) : (
                <span />
              )}
              <div className="flex gap-2">
                <Button type="button" variant="secondary" className="lg:hidden" onClick={() => setShowPreview(true)} icon={<Eye className="size-4" />}>
                  Prévia
                </Button>
                <Button type="submit" loading={vm.submitting} className="flex-row-reverse" icon={vm.isLastStep ? <Check className="size-4" /> : <ArrowRight className="size-4" />}>
                  {vm.isLastStep ? "Publicar minha página" : "Continuar"}
                </Button>
              </div>
            </div>
          </form>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-mocha/60">Prévia ao vivo</p>
            <PhoneFrame url={`cafezinho.app/${form.slug || "seunome"}`}>
              <CreatorCard creator={vm.preview} preview />
            </PhoneFrame>
          </div>
        </aside>
      </main>

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 backdrop-blur-sm sm:items-center lg:hidden" onClick={() => setShowPreview(false)}>
          <div className="w-full max-w-sm animate-fade-up" onClick={(e) => e.stopPropagation()}>
            <PhoneFrame url={`cafezinho.app/${form.slug || "seunome"}`}>
              <CreatorCard creator={vm.preview} preview />
            </PhoneFrame>
            <Button variant="secondary" className="mt-4 w-full" onClick={() => setShowPreview(false)}>
              Fechar prévia
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
