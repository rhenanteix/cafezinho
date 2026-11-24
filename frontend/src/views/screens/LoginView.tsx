"use client";

import Link from "next/link";
import { useLoginViewModel } from "@/viewmodels/useLoginViewModel";
import { Button } from "../components/Button";
import { TextField } from "../components/Field";
import { Logo } from "../components/Logo";

export function LoginView() {
  const vm = useLoginViewModel();
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm animate-fade-up">
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-8 rounded-3xl bg-white p-8 shadow-lift ring-1 ring-black/5">
          <h1 className="text-2xl font-extrabold tracking-tight">Bem-vindo de volta</h1>
          <p className="mt-1 text-sm text-mocha">Entre para editar sua página.</p>
          <form onSubmit={vm.submit} className="mt-6 space-y-4">
            <TextField id="email" label="E-mail" type="email" autoComplete="email" value={vm.email} onChange={(e) => vm.setEmail(e.target.value)} />
            <TextField id="password" label="Senha" type="password" autoComplete="current-password" value={vm.password} onChange={(e) => vm.setPassword(e.target.value)} />
            {vm.error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{vm.error}</p>}
            <Button type="submit" loading={vm.loading} className="w-full">
              Entrar
            </Button>
          </form>
        </div>
        <p className="mt-6 text-center text-sm text-mocha">
          Ainda não tem página?{" "}
          <Link href="/cadastro" className="font-semibold text-brand-600 hover:underline">
            Crie grátis
          </Link>
        </p>
      </div>
    </main>
  );
}
