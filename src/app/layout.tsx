import type { Metadata } from "next";
import { Fraunces, Work_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LanguagePopup from "@/components/LanguagePopup";
import { getLocale, getDictionary, hasLocaleCookie } from "@/lib/i18n";
import { BASE_URL } from "@/lib/articles";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "Inzterior — Interior Design Studio, Iskandar Puteri",
    template: "%s — Inzterior",
  },
  description:
    "Inzterior is a Malaysian interior design studio crafting thoughtful residential and commercial spaces, based in Horizon Hills, Iskandar Puteri.",
};

// HomeAndConstructionBusiness is a subtype of LocalBusiness, which is itself a
// subtype of Organization — so this single node satisfies all three. Stacking a
// separate LocalBusiness node alongside it would duplicate the entity, not
// strengthen it.
//
// Deliberately ABSENT, because FACTS.md has no verified value and inventing one
// is worse than omitting it:
//   geo            — no surveyed latitude/longitude for the Horizon Hills unit
//   openingHours   — business hours are still unset on the Google Business Profile
//   aggregateRating / review — there are no reviews; never invent one
//   foundingDate   — year founded is [UNVERIFIED]
//   priceRange     — no approved price band (B7)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${BASE_URL}/#organization`,
  name: "Inzterior",
  alternateName: "Istory Design Studio",
  legalName: "Istory Design Studio",
  description:
    "Malaysian interior design studio crafting thoughtful residential and commercial spaces, based in Horizon Hills, Iskandar Puteri, operating under written contracts and staged payments.",
  url: BASE_URL,
  logo: `${BASE_URL}/icon.png`,
  image: `${BASE_URL}/icon.png`,
  email: "inquiry@inzterior.com",
  telephone: "+60 13-980 9289",
  knowsLanguage: ["en", "ms", "zh"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+60 13-980 9289",
    email: "inquiry@inzterior.com",
    contactType: "customer service",
    areaServed: "MY",
    availableLanguage: ["English", "Malay", "Chinese"],
  },
  address: {
    "@type": "PostalAddress",
    // Canonical NAP per _control/FACTS.md — keep identical across schema,
    // Google Business Profile and every directory citation.
    streetAddress: "No. 58A, 3, Jalan Eka, Horizon Hills",
    addressLocality: "Iskandar Puteri",
    addressRegion: "Johor",
    postalCode: "79100",
    addressCountry: "MY",
  },
  areaServed: [
    { "@type": "City", name: "Iskandar Puteri" },
    { "@type": "City", name: "Johor Bahru" },
    { "@type": "AdministrativeArea", name: "Johor" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Interior design and renovation services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Residential interior design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial interior design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Renovation design and build" } },
    ],
  },
  founder: {
    "@type": "Person",
    name: "Billy Yeap",
  },
  sameAs: [
    "https://facebook.com/Inzterior",
    "https://www.instagram.com/inzterior",
    "https://www.tiktok.com/@inzterior",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const showLanguagePopup = !(await hasLocaleCookie());

  return (
    <html lang={locale} className={`h-full antialiased ${fraunces.variable} ${workSans.variable}`}>
      <body className="flex min-h-full flex-col">
        {/* Google tag (gtag.js) — beforeInteractive guarantees Next.js hoists this into <head> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MQPYC0FMRX"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MQPYC0FMRX');
          `}
        </Script>
        {/* JSON-LD is our own generated data, not user input */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader dict={dict.nav} locale={locale} languageSwitcherAriaLabel={dict.languageSwitcher.ariaLabel} />
        <main className="flex-1">{children}</main>
        <SiteFooter dict={dict.footer} />
        {showLanguagePopup && <LanguagePopup dict={dict.languagePopup} />}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
