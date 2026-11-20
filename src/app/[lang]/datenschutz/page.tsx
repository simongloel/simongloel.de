import type { Metadata } from "next";
import { Protected } from "@/components/protected";
import { contact } from "@/lib/contact";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "de" ? "Datenschutz" : "Privacy", robots: { index: false }, alternates: { canonical: `/${lang}/datenschutz/` } };
}

export default function Datenschutz() {
  return (
    <div lang="de" className="prose prose-neutral max-w-none pt-6 prose-h1:font-serif prose-h1:font-normal prose-h2:text-lg">
      <h1>Datenschutz</h1>

      <h2>Wer verantwortlich ist</h2>
      <p>
        Simon Gloël, <Protected value={contact.street} />, <Protected value={contact.city} />,{" "}
        <Protected value={contact.email} mail />.
      </p>

      <h2>Was beim Aufruf passiert</h2>
      <p>
        Die Seite hat kein Tracking und lädt nichts von fremden Servern. Schriften und Bilder liegen auf demselben
        Server wie die Seite. Ein Cookie gibt es nur, wenn du oben die Sprache umschaltest: Es heißt <code>lang</code>,
        speichert deine Wahl für ein Jahr und wird nur dafür genutzt (§ 25 Abs. 2 TDDDG).
      </p>
      <p>
        Damit die Seite ausgeliefert werden kann, verarbeitet der Server technisch notwendige Daten: IP-Adresse,
        Zeitpunkt, aufgerufene Adresse, Browser-Kennung und Referrer. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f
        DSGVO, das berechtigte Interesse liegt im sicheren Betrieb der Seite. Diese Daten werden nicht mit anderen
        Daten zusammengeführt und nach kurzer Zeit gelöscht.
      </p>

      <h2>Hosting</h2>
      <p>
        Die Seite läuft auf blitz.cloud, einem Angebot der BlitzWorks UG (haftungsbeschränkt) aus
        Regensburg. Die Server stehen in der EU bei der Hetzner Online GmbH. Anfragen laufen über das Netzwerk von
        Cloudflare, Inc., das unter anderem Angriffe abwehrt und die Verbindung verschlüsselt. Cloudflare ist nach dem
        EU-US Data Privacy Framework zertifiziert.
      </p>

      <h2>E-Mail</h2>
      <p>
        Wenn du mir schreibst, nutze ich deine Nachricht und Adresse nur, um zu antworten. Die Mail liegt bei Google
        (Gmail).
      </p>

      <h2>Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
        und Widerspruch. Eine Mail an die Adresse oben genügt. Außerdem kannst du dich bei einer
        Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Bayerischen Landesamt für Datenschutzaufsicht.
      </p>
    </div>
  );
}
