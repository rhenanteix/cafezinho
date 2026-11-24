import type { Metadata } from "next";
import { LoginView } from "@/views/screens/LoginView";

export const metadata: Metadata = { title: "Entrar" };

export default function Page() {
  return <LoginView />;
}
