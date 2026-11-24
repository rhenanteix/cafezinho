"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/models/services/authService";
import { ApiError } from "@/models/services/httpClient";

export function useLoginViewModel() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError(undefined);
    if (!email || !password) return setError("Preencha e-mail e senha");
    setLoading(true);
    try {
      await authService.login(email, password);
      router.push("/painel");
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Não foi possível entrar");
    } finally {
      setLoading(false);
    }
  }

  return { email, setEmail, password, setPassword, loading, error, submit };
}
