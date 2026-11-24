import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export type LegalSection = { title: string; body: string };

export function LegalView({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-5 py-14">
        <h1 className="text-3xl font-extrabold tracking-tight text-espresso sm:text-4xl">{title}</h1>
        <p className="mt-3 text-mocha">{intro}</p>
        <div className="mt-10 space-y-8">
          {sections.map((s, i) => (
            <section key={s.title}>
              <h2 className="text-lg font-bold text-espresso">
                {i + 1}. {s.title}
              </h2>
              <p className="mt-2 leading-relaxed text-mocha">{s.body}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
