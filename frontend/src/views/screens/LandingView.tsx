"use client";

import { ArrowRight, BadgeCheck, Heart, Link2, Share2, Sparkles, TrendingUp, Wallet, Zap } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import type { PublicCreator } from "@/models/entities";
import { Button } from "../components/Button";
import { CreatorCard } from "../components/CreatorCard";
import { LogoMark } from "../components/Logo";
import { PhoneFrame } from "../components/PhoneFrame";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { CountUp, Reveal, ease, motion } from "../components/motion";

const demo: PublicCreator = {
  slug: "marina",
  name: "Marina Lopes",
  area: "Ilustradora e quadrinista",
  bio: "Desenho tirinhas sobre o dia a dia de quem trabalha de casa. Se meu trabalho te fez sorrir, me paga um café!",
  avatarUrl: null,
  socials: { instagram: "x", youtube: "x", tiktok: null, linkedin: null, x: null, facebook: null, discord: null, spotify: null, website: "x" },
  paymentLinks: [
    { id: "1", label: "Um cafezinho (R$ 5,00)", url: "#", amountCents: 500 },
    { id: "2", label: "Café com pão de queijo (R$ 10,00)", url: "#", amountCents: 1000 },
    { id: "3", label: "Valor livre", url: "#", amountCents: null },
  ],
};

const supporters = [
  { name: "Ana", amount: "R$ 5,00", note: "Amei a tirinha de hoje!" },
  { name: "Lucas", amount: "R$ 10,00", note: "Café com pão de queijo ☕" },
  { name: "Bia", amount: "R$ 15,00", note: "Continua assim!" },
  { name: "Rafa", amount: "R$ 5,00", note: "Me salvou a segunda-feira" },
];

const banks = ["Nubank", "Mercado Pago", "PagBank", "Inter", "PicPay", "C6 Bank", "Itaú", "Bradesco", "Santander", "Caixa"];

const steps = [
  { icon: Link2, title: "Gere seu link no banco", text: "Crie um link de cobrança ou PIX no app do seu banco. Leva 1 minuto." },
  { icon: Sparkles, title: "Monte sua página", text: "Cole os links, escreva uma bio e escolha seu endereço. Você vê tudo ao vivo." },
  { icon: Share2, title: "Compartilhe", text: "Coloque o link na bio, no vídeo ou no README e receba apoio do seu público." },
];

const headline = ["Seu", "público", "quer", "te", "apoiar."];

function SupportToast() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % supporters.length), 2800);
    return () => clearInterval(t);
  }, []);
  const s = supporters[i];
  return (
    <div className="absolute -left-4 top-28 z-20 w-64 sm:-left-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -24, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95 }}
          transition={{ duration: 0.5, ease }}
          className="flex items-center gap-3 rounded-2xl bg-white/90 p-3 shadow-lift ring-1 ring-black/5 backdrop-blur"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zest-300 text-lg">☕</span>
          <div className="min-w-0 text-xs">
            <p className="font-bold text-espresso">
              {s.name} te pagou <span className="text-brand-600">{s.amount}</span>
            </p>
            <p className="truncate text-mocha">{s.note}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function LandingView() {
  return (
    <>
      <SiteHeader />
      <main className="overflow-x-clip">
        <section className="relative">
          <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div className="animate-blob pointer-events-none absolute -top-32 right-[-10%] size-[520px] rounded-full bg-brand-300/50 blur-3xl" />
          <div className="animate-blob pointer-events-none absolute left-[-10%] top-40 size-[380px] rounded-full bg-fuchsia-300/30 blur-3xl [animation-delay:-6s]" />
          <div className="animate-blob pointer-events-none absolute bottom-0 right-1/3 size-[300px] rounded-full bg-zest-300/40 blur-3xl [animation-delay:-12s]" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="inline-flex items-center gap-2 rounded-full bg-white/80 py-1 pl-1 pr-3 text-xs font-semibold text-brand-700 shadow-soft ring-1 ring-brand-100 backdrop-blur"
              >
                <span className="rounded-full bg-zest-400 px-2 py-0.5 text-[10px] font-extrabold uppercase text-espresso">Novo</span>
                100% grátis, sem taxas
              </motion.span>
              <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl">
                {headline.map((w, i) => (
                  <motion.span
                    key={w}
                    className="mr-[0.22em] inline-block"
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.07 }}
                  >
                    {w}
                  </motion.span>
                ))}
                <motion.span
                  className="text-gradient block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.5 }}
                >
                  Deixe ele te pagar um café.
                </motion.span>
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.7 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-mocha"
              >
                Crie sua página de apoio em 3 minutos, cole seus links de PIX e receba direto na sua conta.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.85 }}
                className="mt-9 flex flex-wrap gap-3"
              >
                <Button href="/cadastro" size="lg" icon={<ArrowRight className="size-5" />} className="flex-row-reverse">
                  Criar minha página
                </Button>
                <Button href="/marina" variant="secondary" size="lg">
                  Ver um exemplo
                </Button>
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-8 flex items-center gap-3 text-sm text-mocha">
                <div className="flex -space-x-2">
                  {["from-brand-400 to-fuchsia-500", "from-zest-400 to-emerald-500", "from-sky-400 to-brand-500", "from-fuchsia-400 to-rose-500"].map((g, i) => (
                    <span key={g} className={`grid size-8 place-items-center rounded-full bg-gradient-to-br ${g} text-xs font-bold text-white ring-2 ring-cream`}>
                      {"MLBR"[i]}
                    </span>
                  ))}
                </div>
                <span>
                  Criadores recebendo apoio <strong className="text-espresso">todo dia</strong>
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 4 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              className="relative"
            >
              <div className="animate-float">
                <PhoneFrame url="paguemeucafezinho.com/marina">
                  <CreatorCard creator={demo} preview />
                </PhoneFrame>
              </div>
              <SupportToast />
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", delay: 1.2, bounce: 0.5 }}
                className="absolute -right-2 bottom-20 flex items-center gap-2 rounded-2xl bg-espresso px-4 py-3 text-white shadow-lift sm:-right-10"
              >
                <TrendingUp className="size-5 text-zest-400" />
                <div className="text-xs">
                  <p className="font-bold">+38 apoios</p>
                  <p className="text-white/60">neste mês</p>
                </div>
              </motion.div>
              <motion.span
                animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 right-6 grid size-12 place-items-center rounded-2xl bg-white shadow-lift ring-1 ring-black/5"
              >
                <Heart className="size-6 fill-fuchsia-500 text-fuchsia-500" />
              </motion.span>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-black/5 bg-white/60 py-6">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-mocha/60">Funciona com qualquer banco que tenha PIX</p>
          <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
            <div className="animate-marquee flex w-max gap-3">
              {[...banks, ...banks].map((b, i) => (
                <span key={i} className="rounded-full bg-white px-5 py-2 text-sm font-bold text-mocha shadow-soft ring-1 ring-black/5">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-600">Como funciona</span>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Três passos. Zero burocracia.</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative h-full overflow-hidden rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/5"
                >
                  <span className="absolute -right-4 -top-6 text-[120px] font-extrabold leading-none text-brand-50 transition-colors group-hover:text-brand-100">
                    {i + 1}
                  </span>
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow transition-transform group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="relative mt-6 text-lg font-bold">{title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-mocha">{text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <div className="relative h-full overflow-hidden rounded-[32px] bg-espresso p-8 text-white sm:p-10">
                <div className="animate-blob absolute -right-20 -top-20 size-72 rounded-full bg-brand-500/40 blur-3xl" />
                <Wallet className="relative size-8 text-zest-400" />
                <h3 className="relative mt-5 max-w-md text-3xl font-extrabold tracking-tight">Dinheiro direto na sua conta. A gente não fica com nada.</h3>
                <p className="relative mt-3 max-w-md text-white/70">Seu apoiador paga no seu banco, pelo seu link. Sem intermediário, sem saque, sem taxa.</p>
                <div className="relative mt-8 flex items-end gap-2">
                  <span className="text-5xl font-extrabold text-zest-400">
                    <CountUp value={0} />%
                  </span>
                  <span className="pb-2 text-sm text-white/60">de taxa sobre seus apoios</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-[32px] bg-zest-300 p-8">
                <Zap className="size-8 text-espresso" />
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight">Pronto em 3 minutos</h3>
                <p className="mt-2 text-sm text-espresso/70">Cadastro em 3 passos com prévia ao vivo e endereço verificado na hora.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-[32px] bg-white p-8 shadow-soft ring-1 ring-black/5">
                <BadgeCheck className="size-8 text-brand-600" />
                <h3 className="mt-5 text-2xl font-extrabold tracking-tight">Simples e gratuito</h3>
                <p className="mt-2 text-sm text-mocha">Sem mensalidade, sem plano. Edite quando quiser.</p>
              </div>
            </Reveal>
            <Reveal delay={0.2} className="md:col-span-2">
              <div className="flex h-full flex-col justify-between gap-6 rounded-[32px] bg-brand-gradient animate-gradient p-8 text-white sm:flex-row sm:items-center sm:p-10">
                <div>
                  <TrendingUp className="size-8 text-zest-300" />
                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight">Acompanhe cada apoio</h3>
                  <p className="mt-2 max-w-sm text-sm text-white/80">Veja visitas e cliques de cada botão no seu painel.</p>
                </div>
                <div className="flex gap-3">
                  {[
                    { n: 1284, l: "visitas" },
                    { n: 312, l: "cliques" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur">
                      <CountUp value={s.n} className="text-3xl font-extrabold tabular-nums" />
                      <p className="text-xs text-white/70">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-5 pb-24">
          <Reveal>
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[40px] bg-white px-6 py-16 text-center shadow-lift ring-1 ring-black/5">
              <div className="bg-dots absolute inset-0 opacity-60" />
              <div className="relative">
                <motion.div className="inline-block" animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}>
                  <LogoMark size={64} />
                </motion.div>
                <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  Pronto para o seu <span className="text-gradient">primeiro café?</span>
                </h2>
                <p className="mt-4 text-mocha">Se ainda não tem seu link de pagamento, a gente te mostra como criar.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button href="/cadastro" size="lg" icon={<ArrowRight className="size-5" />} className="flex-row-reverse">
                    Começar agora
                  </Button>
                  <Button href="/como-criar-link" variant="secondary" size="lg">
                    Como criar meu link
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
