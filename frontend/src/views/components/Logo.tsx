import Link from "next/link";
import { Coffee } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2 font-extrabold tracking-tight text-espresso ${className}`}>
      <span className="grid size-9 place-items-center rounded-xl bg-brand-500 text-white shadow-soft">
        <Coffee className="size-5" strokeWidth={2.4} />
      </span>
      <span className="text-lg">cafezinho</span>
    </Link>
  );
}
