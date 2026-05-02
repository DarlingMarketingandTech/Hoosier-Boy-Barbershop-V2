import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  CORE_MENU,
  CORE_MENU_ORDER,
  INSTAGRAM_PROFILE_URL,
  SHOP_META,
  getCoreServicePriceBounds,
} from "@/lib/constants";
import { buildOpeningHoursSpecification } from "@/lib/json-ld";
import { getSiteLogoAbsoluteUrl, SITE_LOGO_PATH } from "@/components/ui/media-assets";
import BookingDrawer from "@/components/booking-drawer";
import { BookingProvider } from "@/components/booking-context";
import CustomCursor from "@/components/custom-cursor";
import PageTransition from "@/components/page-transition";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import PwaInstallBanner from "@/components/pwa-install-banner";
import PwaServiceWorkerRegister from "@/components/pwa-service-worker-register";
import { BOOKSY_PROFILE_URL } from "@/lib/booksy";

const siteUrl = "https://hoosierboybarber.com";

const streetAddress = [
  SHOP_META.address.street,
  SHOP_META.address.suite,
]
  .filter(Boolean)
  .join(", ");

const ogLogoUrl = SITE_LOGO_PATH;
const faviconUrl = SITE_LOGO_PATH;
const appleTouchUrl = SITE_LOGO_PATH;

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hoosier Boy Barbershop — Noblesville, IN",
    template: "%s · Hoosier Boy Barbershop",
  },
  description:
    "Hoosier Boy Barbershop in Noblesville delivers precision haircuts, beard trims, and Nate Gouty's Non-Surgical Hair Replacement program. Book your chair online.",
  alternates: {
    canonical: siteUrl,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: faviconUrl, type: "image/png" }],
    apple: [
      { url: appleTouchUrl, sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Hoosier Boy Barbershop — Noblesville, IN",
    description:
      "Precision cuts, beard architecture, and specialist NSHR consultations — Hoosier Boy Barbershop at Town Center Blvd.",
    url: siteUrl,
    siteName: SHOP_META.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogLogoUrl,
        width: 861,
        height: 902,
        type: "image/png",
        alt: `${SHOP_META.name} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hoosier Boy Barbershop — Noblesville, IN",
    description:
      "Precision cuts, beard architecture, and specialist NSHR consultations — Hoosier Boy Barbershop at Town Center Blvd.",
    images: [ogLogoUrl],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Hoosier Boy",
  },
};

const { min: minPrice, max: maxPrice } = getCoreServicePriceBounds();

const schemaLogoUrl = getSiteLogoAbsoluteUrl(siteUrl);

const hasOfferCatalog = {
  "@type": "OfferCatalog",
  name: "Core grooming menu",
  itemListElement: CORE_MENU_ORDER.map((slug, index) => {
    const m = CORE_MENU[slug];
    const floor = Math.min(m.jimmy.priceUsd, m.nate.priceUsd);
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Offer",
        name: m.name,
        description: m.shopDescription,
        priceCurrency: "USD",
        price: floor,
        itemOffered: {
          "@type": "Service",
          name: m.name,
          description: m.shopDescription,
        },
      },
    };
  }),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  additionalType: "https://schema.org/HairSalon",
  "@id": `${siteUrl}/#barbershop`,
  name: SHOP_META.name,
  url: siteUrl,
  image: [schemaLogoUrl],
  logo: {
    "@type": "ImageObject",
    url: schemaLogoUrl,
  },
  telephone: "+13179001290",
  email: SHOP_META.email,
  priceRange: `$${minPrice}–$${maxPrice}`,
  hasOfferCatalog,
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
  sameAs: [BOOKSY_PROFILE_URL, INSTAGRAM_PROFILE_URL],
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
      <body className="min-h-full flex flex-col bg-[#080808] text-[#f0ece4] film-grain">
        <BookingProvider>
          <CustomCursor />
          <PageTransition>{children}</PageTransition>
          <BookingDrawer />
          <PwaServiceWorkerRegister />
          <PwaInstallBanner />
          <MobileBottomNav />
        </BookingProvider>
      </body>
    </html>
  );
}
