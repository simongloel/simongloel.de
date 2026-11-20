import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-6">
      <h1 className="font-serif text-4xl text-ink">Not found</h1>
      <p className="mt-4 text-muted">
        This page doesn&apos;t exist. <Link href="/" className="text-accent hover:underline">Back to the start</Link>.
      </p>
    </div>
  );
}
