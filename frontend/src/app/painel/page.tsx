import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardView } from "@/views/screens/DashboardView";

export const metadata: Metadata = { title: "Meu painel" };

export default function Page() {
  return (
    <Suspense>
      <DashboardView />
    </Suspense>
  );
}
