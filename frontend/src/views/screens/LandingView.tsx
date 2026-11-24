import { ArrowRight, BadgeCheck, Link2, Share2, Sparkles, Wallet, Zap } from "lucide-react";
import type { PublicCreator } from "@/models/entities";
import { Button } from "../components/Button";
import { CreatorCard } from "../components/CreatorCard";
import { PhoneFrame } from "../components/PhoneFrame";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

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

const steps = [
  { icon: Link2, title: "Gere seu link no banco", text: "Crie um link de cobrança ou PIX no app do seu banco. Leva 1 minuto." },
  { icon: Sparkles, title: "Monte sua página", text: "Cole os links, escreva uma bio e escolha seu endereço. Você vê tudo ao vivo." },
  { icon: Share2, title: "Compartilhe", text: "Coloque o link na bio, no vídeo ou no README e receba apoio do seu público." },
];

const features = [
  { icon: Wallet, title: "Dinheiro direto na sua conta", text: "A gente não intermedeia pagamentos. Seu apoiador paga direto no seu banco." },
  { icon: Zap, title: "Pronto em 3 minutos", text: "Cadastro em 3 passos, com pré-visualização ao vivo e verificação do endereço na hora." },
  { icon: BadgeCheck, title: "Simples e gratuito", text: "Sem mensalidade, sem plano. Edite sua página quando quiser e acompanhe os cliques." },
];

export function LandingView() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute -top-40 right-0 size-[600px] rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 md:grid-cols-[1.1fr_1fr] md:py-24">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-brand-700 shadow-soft ring-1 ring-brand-100">
                <Sparkles className="size-3.5" /> Grátis para criadores
              </span>
              <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                Seu público quer te apoiar.{" "}
                <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">Deixe ele te pagar um café.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-relaxed text-mocha">
                Crie uma página bonita com seus links de PIX ou pagamento e receba apoio direto na sua conta. Sem taxas, sem complicação.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/cadastro" size="lg" icon={<ArrowRight className="size-5" />} className="flex-row-reverse">
                  Criar minha página
                </Button>
                <Button href="/marina" variant="secondary" size="lg">
                  Ver um exemplo
                </Button>
              </div>
              <p className="mt-4 text-sm text-mocha/70">Funciona com Nubank, Mercado Pago, PagBank e qualquer banco com PIX.</p>
            </div>
            <div className="animate-fade-up [animation-delay:120ms]">
              <PhoneFrame url="cafezinho.app/marina">
                <CreatorCard creator={demo} preview />
              </PhoneFrame>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl">Como funciona</h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-mocha">Três passos e sua página está no ar.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-black/5">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand-100 text-brand-700">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-sm font-bold text-mocha/50">Passo {i + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mocha">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-8 rounded-[36px] bg-espresso p-8 text-white sm:p-12 md:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon className="size-7 text-brand-300" />
                <h3 className="mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-5 py-20 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Pronto para receber seu primeiro café?</h2>
          <p className="mt-3 text-mocha">Se ainda não tem seu link de pagamento, a gente te mostra como criar.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/cadastro" size="lg">Começar agora</Button>
            <Button href="/como-criar-link" variant="secondary" size="lg">Como criar meu link</Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
