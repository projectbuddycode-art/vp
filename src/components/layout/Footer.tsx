import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { disclaimer, navItems, services, type SiteSettings } from "@/lib/site";
import { whatsappHref } from "@/lib/utils";

export function Footer({ settings }: { settings: SiteSettings }) {
  const whatsapp = whatsappHref(
    settings.whatsapp,
    "Hello, I would like to enquire about a personal Vastu consultation.",
  );

  return (
    <footer className="dark-panel text-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <p className="font-serif text-3xl">Sanjeev Jain</p>
          <p className="mt-2 text-sm text-sand">Vastu consultancy</p>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-sand">{settings.tagline}</p>
        </div>
        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">Visit</p>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.slice(1, 5).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="vedic-link text-sand hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/knowledge-centre" className="vedic-link text-sand hover:text-ivory">
                Knowledge Centre
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">Expertise</p>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/expertise/${service.slug}`} className="vedic-link text-sand hover:text-ivory">
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[0.68rem] tracking-[0.2em] text-gold uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-sand">
            {settings.phone ? (
              <li>
                <a href={`tel:${settings.phone}`} className="vedic-link hover:text-ivory">
                  {settings.phone}
                </a>
              </li>
            ) : (
              <li>Phone to be published</li>
            )}
            {settings.email ? (
              <li>
                <a href={`mailto:${settings.email}`} className="vedic-link hover:text-ivory">
                  {settings.email}
                </a>
              </li>
            ) : (
              <li>Email to be published</li>
            )}
            {settings.address ? <li>{settings.address}</li> : <li>Address to be published</li>}
            {settings.serviceAreas ? <li>Service areas: {settings.serviceAreas}</li> : null}
          </ul>
          <div className="mt-5 flex flex-wrap gap-4 text-[0.68rem] tracking-[0.16em] uppercase">
            {whatsapp ? (
              <a href={whatsapp} className="vedic-link text-sand hover:text-ivory">
                WhatsApp
              </a>
            ) : (
              <span className="text-sand/70">WhatsApp to be added</span>
            )}
            {settings.instagramUrl ? (
              <a href={settings.instagramUrl} className="vedic-link text-sand hover:text-ivory">
                Instagram
              </a>
            ) : (
              <span className="text-sand/70">Instagram to be added</span>
            )}
            {settings.linkedinUrl ? (
              <a href={settings.linkedinUrl} className="vedic-link text-sand hover:text-ivory">
                LinkedIn
              </a>
            ) : (
              <span className="text-sand/70">LinkedIn to be added</span>
            )}
          </div>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-6">
        <p className="max-w-4xl text-xs leading-relaxed text-sand/80">{disclaimer}</p>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.68rem] tracking-[0.14em] text-sand uppercase">
          <Link href="/privacy-policy" className="vedic-link hover:text-ivory">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="vedic-link hover:text-ivory">
            Terms and Conditions
          </Link>
          <Link href="/contact" className="vedic-link hover:text-ivory">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  );
}
