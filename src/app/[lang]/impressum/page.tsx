import type { Metadata } from "next";
import { Protected } from "@/components/protected";
import { contact } from "@/lib/contact";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "de" ? "Impressum" : "Imprint", robots: { index: false }, alternates: { canonical: `/${lang}/impressum/` } };
}

export default function Impressum() {
  return (
    <div lang="de" className="pt-6">
      <h1 className="font-serif text-4xl text-ink">Impressum</h1>
      <div className="mt-8 space-y-6 text-ink/90">
        <p>
          Angaben gemäß § 5 DDG
          <br />
          Simon Gloël
          <br />
          <Protected value={contact.street} />
          <br />
          <Protected value={contact.city} />
        </p>
        <p>
          E-Mail: <Protected value={contact.email} mail className="text-accent hover:underline" />
        </p>
        <p>
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:
          <br />
          Simon Gloël, Anschrift wie oben
        </p>
        <p>
          Dies ist eine private Website. blitz.cloud ist ein Angebot der BlitzWorks UG (haftungsbeschränkt), deren
          Angaben im{" "}
          <a href="https://blitz.cloud/imprint/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            Impressum von blitz.cloud
          </a>{" "}
          stehen.
        </p>
      </div>
    </div>
  );
}
