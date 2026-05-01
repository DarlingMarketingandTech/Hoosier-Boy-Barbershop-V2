import type { Metadata } from "next";
import "./globals.css";
import { SERVICES, SHOP_META } from "@/lib/constants";
import { buildOpeningHoursSpecification } from "@/lib/json-ld";
import { getMasterLogoUrlSchema } from "@/components/ui/media-assets";
import CustomCursor from "@/components/custom-cursor";
import PageTransition from "@/components/page-transition";

const siteUrl = "https://hoosierboybarber.com";

const streetAddress = [
  SHOP_META.address.street,
  SHOP_META.address.suite,
]
  .filter(Boolean)
  .join(", ");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Hoosier Boy Barbershop — Noblesville, IN",
  description:
    "Hoosier Boy Barbershop in Noblesville delivers precision haircuts, beard trims, and Nate Shepherd's Non-Surgical Hair Replacement program. Book your chair online.",
  openGraph: {
    title: "Hoosier Boy Barbershop — Noblesville, IN",
    description:
      "Precision cuts, beard architecture, and specialist NSHR consultations — Hoosier Boy Barbershop at Town Center Blvd.",
    url: siteUrl,
    siteName: SHOP_META.name,
    locale: "en_US",
    type: "website",
  },
};

const haircutPrices = SERVICES.filter((s) => s.price != null).map((s) => s.price!);
const minPrice = Math.min(...haircutPrices);
const maxPrice = Math.max(...haircutPrices);

const schemaLogoUrl = getMasterLogoUrlSchema();

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "@id": `${siteUrl}/#barbershop`,
  name: SHOP_META.name,
  url: siteUrl,
  image: [schemaLogoUrl],
  logo: {
    "@type": "ImageObject",
    url: schemaLogoUrl,
  },
  telephone: SHOP_META.phone,
  priceRange: `$${minPrice}–$${maxPrice}`,
  address: {
    "@type": "PostalAddress",
    streetAddress,
    addressLocality: SHOP_META.address.city,
    addressRegion: SHOP_META.address.state,
    postalCode: SHOP_META.address.zip,
    addressCountry: SHOP_META.address.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SHOP_META.coordinates.lat,
    longitude: SHOP_META.coordinates.lng,
  },
  areaServed: {
    "@type": "City",
    name: "Noblesville",
    containedInPlace: {
      "@type": "State",
      name: "Indiana",
    },
  },
  openingHoursSpecification: buildOpeningHoursSpecification(),
  sameAs: [
    SHOP_META.bookingUrl,
    "https://www.instagram.com/hoosierboybarber",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f0ece4]">
        <CustomCursor />
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
