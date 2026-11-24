"use client";

import { useSession } from "@/viewmodels/useSession";
import { Button } from "./Button";
import { Logo } from "./Logo";

export function SiteHeader() {
  const session = useSession();
  return (
    <header className="sticky top-0 z-30 border-b border-black/5 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo />
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button href="/como-criar-link" variant="ghost" size="sm" className="hidden sm:inline-flex">
            Como criar meu link
          </Button>
          {session ? (
            <Button href="/painel" variant="dark" size="sm">
              Meu painel
            </Button>
          ) : (
            <>
              <Button href="/entrar" variant="ghost" size="sm">
                Entrar
              </Button>
              <Button href="/cadastro" size="sm">
                Criar minha página
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
