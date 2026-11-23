import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrandMark } from "@/components/brand/Logo";
import { getCopy } from "@/lib/i18n/get-locale";
import { navItems, services, type SiteSettings } from "@/lib/site";
import { publicWhatsappNumber, whatsappHref } from "@/lib/utils";

const footerNav = ["about", "understanding", "approach", "services"] as const;

export async function Footer({ settings }: { settings: SiteSettings }) {
  const copy = await getCopy();
  const whatsapp = whatsappHref(publicWhatsappNumber(settings.whatsapp, settings.phone), copy.footer.whatsappMessage);

  return (
    <footer className="dark-panel text-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-24">
        <div>
          <BrandMark light />
          <p className="mt-3 font-serif text-3xl tracking-[0.12em]">STHAPATYA</p>
          <p className="mt-2 text-sm text-sand">
            <span className="devanagari">स्थापत्य</span> · Sanjeev Jain
          </p>
          <p className="mt-6 max-w-xs text-sm leading-[1.7] text-sand">{settings.tagline}</p>
          <p className="devanagari mt-3 text-sm text-sand">वास्तु · दिशा · संतुलन</p>
        </div>
        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">{copy.footer.visit}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {navItems.slice(1, 5).map((item, index) => (
              <li key={item.href}>
                <Link href={item.href} className="vedic-link text-sand transition-colors hover:text-ivory">
                  {copy.nav[footerNav[index]]}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/knowledge-centre" className="vedic-link text-sand transition-colors hover:text-ivory">
                {copy.nav.knowledge}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">{copy.footer.expertise}</p>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/expertise/${service.slug}`} className="vedic-link text-sand transition-colors hover:text-ivory">
                  {copy.form.serviceTitles[service.slug] || service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">{copy.footer.contact}</p>
          <ul className="mt-4 space-y-2 text-sm text-sand">
            {settings.phone ? (
              <li>
                <a href={`tel:${settings.phone}`} className="vedic-link hover:text-ivory">
                  {settings.phone}
                </a>
              </li>
            ) : null}
            {settings.email ? (
              <li>
                <a href={`mailto:${settings.email}`} className="vedic-link hover:text-ivory">
                  {settings.email}
                </a>
              </li>
            ) : null}
            {settings.address ? <li>{settings.address}</li> : null}
            {settings.serviceAreas ? <li>{copy.footer.serviceAreas}: {settings.serviceAreas}</li> : null}
            <li>
              <Link href="/contact" className="vedic-link hover:text-ivory">
                {copy.footer.enquire}
              </Link>
            </li>
          </ul>
          {whatsapp || settings.instagramUrl || settings.linkedinUrl ? (
            <div className="mt-5 flex flex-wrap gap-4 text-[0.68rem] tracking-[0.16em] uppercase">
              {whatsapp ? (
                <a href={whatsapp} className="vedic-link text-sand hover:text-ivory">
                  WhatsApp
                </a>
              ) : null}
              {settings.instagramUrl ? (
                <a href={settings.instagramUrl} className="vedic-link text-sand hover:text-ivory">
                  Instagram
                </a>
              ) : null}
              {settings.linkedinUrl ? (
                <a href={settings.linkedinUrl} className="vedic-link text-sand hover:text-ivory">
                  LinkedIn
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
      <Container className="border-t border-white/10 py-6">
        <p className="max-w-4xl text-xs leading-relaxed text-sand/80">{copy.home.disclaimer}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.68rem] tracking-[0.14em] text-sand uppercase">
          <Link href="/privacy-policy" className="vedic-link hover:text-ivory">
            {copy.footer.privacy}
          </Link>
          <Link href="/terms-and-conditions" className="vedic-link hover:text-ivory">
            {copy.footer.terms}
          </Link>
          <Link href="/contact" className="vedic-link hover:text-ivory">
            {copy.nav.contact}
          </Link>
        </div>
      </Container>
    </footer>
  );
}
