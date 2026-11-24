import type { Metadata } from "next";
import { SignupView } from "@/views/screens/SignupView";

export const metadata: Metadata = { title: "Criar minha página" };

export default function Page() {
  return <SignupView />;
}
