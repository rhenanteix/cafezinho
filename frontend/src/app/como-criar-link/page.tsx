import type { Metadata } from "next";
import { GuideView } from "@/views/screens/GuideView";

export const metadata: Metadata = { title: "Como criar seu link de pagamento" };

export default function Page() {
  return <GuideView />;
}
