import Link from "next/link";
import { Logo } from "./Logo";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/5 bg-white/50">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 text-sm text-mocha sm:flex-row">
        <Logo />
        <nav className="flex gap-5">
          <Link href="/como-criar-link" className="hover:text-espresso">Guia de links</Link>
          <Link href="/cadastro" className="hover:text-espresso">Criar página</Link>
          <Link href="/entrar" className="hover:text-espresso">Entrar</Link>
        </nav>
        <p className="text-mocha/70">Feito com café no Brasil</p>
      </div>
    </footer>
  );
}
