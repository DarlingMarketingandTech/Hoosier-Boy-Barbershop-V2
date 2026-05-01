import type { Metadata } from "next";
import "./globals.css";
import { SHOP_META } from "@/lib/constants";
import CustomCursor from "@/components/custom-cursor";
import PageTransition from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Hoosier Boy Barbershop — Classic Cuts. Modern Craft.",
  description:
    "Indianapolis's premier destination for precision haircuts, hot-towel shaves, and the full barber experience. Book your appointment with Hoosier Boy Barbershop today.",
};

/** LocalBusiness JSON-LD for Indianapolis local SEO */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: SHOP_META.name,
  url: "https://hoosierboybarber.com",
  image: "https://hoosierboybarber.com/og-image.jpg",
  telephone: SHOP_META.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SHOP_META.address.street,
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
  openingHours: SHOP_META.hours.schema,
  priceRange: "$$",
  sameAs: [
    "https://www.booksy.com/en-us/hoosierboybarber",
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
