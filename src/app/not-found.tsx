import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center py-28">
      <p className="text-[0.72rem] tracking-[0.22em] text-gold uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl sm:text-7xl">This page is not on the plan.</h1>
      <p className="mt-4 max-w-lg text-deep/70">The address does not match a published page. You can return home or request a consultation.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="bg-deep px-5 py-3 text-[0.72rem] tracking-[0.16em] text-ivory uppercase">
          Home
        </Link>
        <Link href="/contact" className="border border-deep/20 px-5 py-3 text-[0.72rem] tracking-[0.16em] uppercase">
          Contact
        </Link>
      </div>
    </Container>
  );
}
