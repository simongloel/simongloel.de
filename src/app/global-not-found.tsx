import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Not found · Simon Gloël" };

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <main className="mx-auto max-w-2xl px-5 pt-24">
          <h1 className="text-3xl text-ink">Not found</h1>
          <p className="mt-4 text-muted">
            This page doesn&apos;t exist. <a href="/" className="text-accent hover:underline">Back to the start</a>.
          </p>
        </main>
      </body>
    </html>
  );
}
