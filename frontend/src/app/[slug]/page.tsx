import { Suspense } from "react";
import { PublicProfileView } from "@/views/screens/PublicProfileView";

export default function Page() {
  return (
    <Suspense>
      <PublicProfileView />
    </Suspense>
  );
}
