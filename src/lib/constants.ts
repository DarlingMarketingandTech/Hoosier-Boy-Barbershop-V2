export interface Barber {
  id: string;
  name: string;
  title: string;
  bio: string;
  /** Legacy path segments — replaced by Cloudinary in UI */
  imagePlaceholder: string;
  specialty: string;
  /** Instagram handle without the @ symbol */
  instagram: string;
  /** Menu items this barber anchors */
  serviceIds: string[];
}

export type TestimonialStaffFilter = "all" | "jimmy" | "nate";

export interface Testimonial {
  id: string;
  author: string;
  quote: string;
  source: "Booksy" | "Google" | "Yelp";
  rating: 5;
  /** ISO or display date from Booksy */
  date?: string;
  serviceName?: string;
  staffName?: string;
  confirmedClient?: boolean;
  /** Which barber filters include this card (Chris → both) */
  staffTags: TestimonialStaffFilter[];
}

export interface ShopMeta {
  name: string;
  address: {
    street: string;
    suite?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone: string;
  email: string;
  /** Human-readable hours blurb for footer / drawer */
  hours: {
    display: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  bookingUrl: string;
}

export type ServiceCategory = "cut" | "shave" | "treatment" | "specialist";

export interface Service {
  id: string;
  name: string;
  description: string;
  /** Omit when quoting in-app only */
  price?: number;
  duration: number;
  category: ServiceCategory;
  /** Booking drawer shows quote flow instead of a dollar amount */
  quoteOnly?: boolean;
  /** Booksy numeric service id (dl/show-business deep link) */
  booksyServiceId?: string;
}

export type WeekdayLong =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type TimeShift = { open: string; close: string };

/**
 * Multi-shift weekly template — Tue–Sat mirrors the in-shop rhythm.
 * Times are 24h HH:MM in {@link SHOP_TIMEZONE} (see hours.ts).
 */
export const WEEKLY_HOURS: Partial<Record<WeekdayLong, TimeShift[]>> = {
  Tuesday: [
    { open: "08:00", close: "11:00" },
    { open: "11:30", close: "14:00" },
  ],
  Wednesday: [
    { open: "08:00", close: "11:00" },
    { open: "11:30", close: "14:00" },
  ],
  Thursday: [
    { open: "08:00", close: "11:00" },
    { open: "11:30", close: "14:00" },
  ],
  Friday: [
    { open: "08:00", close: "11:00" },
    { open: "11:30", close: "14:00" },
  ],
  Saturday: [
    { open: "08:00", close: "11:00" },
    { open: "11:30", close: "14:00" },
  ],
};

export const BARBERS: Barber[] = [
  {
    id: "jimmy",
    name: "Jimmy Bissonette",
    title: "Barber · Classic Specialist",
    bio: "Jimmy delivers clean, structured classics with barbershop discipline — scissor-over-comb tailoring, crisp lines, and beard work that respects your growth pattern. If you want a cut that ages well and a beard that behaves, you’re in his chair.",
    imagePlaceholder: "/barbers/jimmy.jpg",
    specialty: "Classic Cut & Beard Architecture",
    instagram: "le_petit_bison",
    serviceIds: [
      "classic-cut",
      "beard-trim-jimmy",
      "the-hour-jimmy",
      "hair-beard-jimmy",
    ],
  },
  {
    id: "nate",
    name: "Nate Gouty",
    title: "Specialist / Senior Barber",
    bio: "Nate pairs senior-level fading and finishing with an educator’s eye for detail — precise transitions, honest consultations, and finishes that hold up in the real world. He also leads Hoosier Boy’s Non-Surgical Hair Replacement program with clinical-grade patience.",
    imagePlaceholder: "/barbers/nate.jpg",
    specialty: "Senior Fades · NSHR Lead",
    instagram: "goutycuts",
    serviceIds: [
      "haircut-nate",
      "beard-trim-nate",
      "the-hour-nate",
      "hair-beard-nate",
      "nshr-consult",
      "nshr-install",
      "nshr-maintain",
    ],
  },
];

/** Indiana sales tax shown in booking drawer (Booksy collects final tax). */
export const SALES_TAX_RATE = 0.05 as const;

/** Default haircut Booksy ids for testimonial CTAs */
export const HAIRCUT_BOOKSY_ID = {
  jimmy: "4927560",
  nate: "7883889",
} as const;

/** Official shop Instagram (handles + profile URL stay in sync for schema/footer). */
export const INSTAGRAM_PROFILE_URL =
  "https://www.instagram.com/hoosierboybarbershop/" as const;

/** Core menu — prices & Booksy ids verified via Booksy business profile (Firecrawl, May 2026). */
export const SERVICES: Service[] = [
  {
    id: "classic-cut",
    name: "Haircut",
    description:
      "Standard haircut polished with a straight razor shave on the back of the neck — Jimmy.",
    price: 45,
    duration: 30,
    category: "cut",
    booksyServiceId: "4927560",
  },
  {
    id: "beard-trim-jimmy",
    name: "Beard Trim",
    description:
      "Shape, taper, and hot-towel finish with straight razor shave — Jimmy.",
    price: 45,
    duration: 30,
    category: "shave",
    booksyServiceId: "4927561",
  },
  {
    id: "the-hour-jimmy",
    name: "The Hour",
    description:
      "Long-form slot for long hair, premium cuts, designs, or new guests who need a thorough consult — Jimmy.",
    price: 80,
    duration: 60,
    category: "cut",
    booksyServiceId: "4927562",
  },
  {
    id: "hair-beard-jimmy",
    name: "Hair + Beard",
    description:
      "Signature haircut plus classic beard trim and straight razor shave — Jimmy.",
    price: 80,
    duration: 60,
    category: "cut",
    booksyServiceId: "4927569",
  },
  {
    id: "haircut-nate",
    name: "Haircut",
    description:
      "Standard haircut polished with a straight razor shave on the back of the neck — Nate.",
    price: 50,
    duration: 30,
    category: "cut",
    booksyServiceId: "7883889",
  },
  {
    id: "beard-trim-nate",
    name: "Beard Trim",
    description:
      "Shape, taper, and hot-towel finish with straight razor shave — Nate.",
    price: 50,
    duration: 30,
    category: "shave",
    booksyServiceId: "7883891",
  },
  {
    id: "the-hour-nate",
    name: "The Hour",
    description:
      "Long-form slot for long hair, premium cuts, designs, or new guests who need a thorough consult — Nate.",
    price: 85,
    duration: 60,
    category: "cut",
    booksyServiceId: "7883894",
  },
  {
    id: "hair-beard-nate",
    name: "Hair + Beard",
    description:
      "Signature haircut plus classic beard trim and straight razor shave — Nate.",
    price: 85,
    duration: 60,
    category: "cut",
    booksyServiceId: "7883896",
  },
];

/** Nate · Non-Surgical Hair Replacement — numeric pricing supplied later */
export interface NSHRService {
  id: string;
  code: string;
  name: string;
  description: string;
  durationMin: number;
  /** Populate when pricing is finalized */
  priceUsd?: number;
  booksyServiceId?: string;
}

export const NSHR_SERVICES: NSHRService[] = [
  {
    id: "nshr-consult",
    code: "NSHR-CONSULT",
    name: "Consultation",
    description:
      "Private scalp assessment, density mapping, lifestyle fit, and a written plan before any installation work begins.",
    durationMin: 30,
    booksyServiceId: "9624401",
  },
  {
    id: "nshr-install",
    code: "NSHR-INSTALL",
    name: "Installation",
    description:
      "Medical-grade adhesion + directional styling pass so the unit disappears into your existing profile.",
    durationMin: 180,
    booksyServiceId: "9638165",
  },
  {
    id: "nshr-maintain",
    code: "NSHR-MAINTAIN",
    name: "Maintenance",
    description:
      "Re-bond edges, fiber refresh, and detailing so the system stays invisible week after week.",
    durationMin: 60,
    booksyServiceId: "9638189",
  },
];

/** Rows for the intelligent booking drawer (menu + NSHR). */
export type DrawerBookableRow = {
  key: string;
  name: string;
  description: string;
  durationMin: number;
  price: number | null;
  booksyServiceId: string;
  quoteOnly?: boolean;
};

export const DRAWER_BOOKABLE: DrawerBookableRow[] = [
  ...SERVICES.filter((s) => s.booksyServiceId).map((s) => ({
    key: s.id,
    name: s.name,
    description: s.description,
    durationMin: s.duration,
    price: s.price ?? null,
    booksyServiceId: s.booksyServiceId!,
    quoteOnly: false,
  })),
  ...NSHR_SERVICES.filter((n) => n.booksyServiceId).map((n) => ({
    key: n.id,
    name: n.name,
    description: n.description,
    durationMin: n.durationMin,
    price: n.priceUsd ?? null,
    booksyServiceId: n.booksyServiceId!,
    quoteOnly: true,
  })),
];

export const SITE_CONFIG = {
  name: "Hoosier Boy",
  tagline: "Classic Cuts. Modern Craft.",
  bookingUrl: "#book",
};

/** Structured shop metadata — footer, contact, JSON-LD */
export const SHOP_META: ShopMeta = {
  name: "Hoosier Boy Barbershop",
  address: {
    street: "13901 Town Center Blvd",
    suite: "Suite 500",
    city: "Noblesville",
    state: "IN",
    zip: "46060",
    country: "US",
  },
  phone: "(317) 900-1290",
  email: "HoosierBoyBarbershop@gmail.com",
  hours: {
    display:
      "Tue–Sat · 8:00 AM – 11:00 AM · 11:30 AM – 2:00 PM · Closed Sun–Mon",
  },
  coordinates: {
    lat: 40.04552,
    lng: -86.01381,
  },
  bookingUrl:
    "https://booksy.com/en-us/746827_hoosier-boy-barbershop_barber-shop_19578_noblesville?do=invite",
};

/** Intro copy for the brand partners section on the home page. */
export const BRAND_PARTNERS_INTRO =
  "At Hoosier Boy Barbershop, we believe in partnering with brands that share our commitment to quality, innovation, and sustainability. We have carefully selected a range of grooming products from some of the most respected and trusted brands in the industry.";

export type BrandPartner = {
  id: string;
  /** Partner or line name — edit to match your shelf. */
  name: string;
  /** Short supporting line */
  tagline: string;
  /** Optional logo under `public/images/partners/…` */
  logoSrc?: string;
};

/**
 * Partner highlights for the marketing grid.
 * Add `logoSrc` (e.g. `/images/partners/reuzel.svg`) when artwork is ready.
 */
export const BRAND_PARTNERS: BrandPartner[] = [
  {
    id: "styling",
    name: "Styling house",
    tagline: "Pomades, pastes & matte sculpting for every finish line.",
  },
  {
    id: "beard",
    name: "Beard atelier",
    tagline: "Oils, balms & waxes with cheek-line discipline.",
  },
  {
    id: "shave",
    name: "Shave ritual",
    tagline: "Pre-shave, hot lather & post-care for zero drag.",
  },
  {
    id: "tools",
    name: "Tooling lab",
    tagline: "Clipper care, blade hygiene & pro-grade maintenance.",
  },
  {
    id: "finish",
    name: "Walk-out polish",
    tagline: "Tonics, sprays & dry texture for the last 5%.",
  },
];

/** Latest five-star Booksy reviews (verified via Firecrawl, May 2026). */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rv-mitch-2026",
    author: "Mitch",
    quote:
      "Nate did a great job. My son's words \"best haircut he has ever had\"",
    source: "Booksy",
    rating: 5,
    date: "Mar 25, 2026",
    serviceName: "Haircut",
    staffName: "Nate Gouty",
    confirmedClient: true,
    staffTags: ["all", "nate"],
  },
  {
    id: "rv-jon-2026a",
    author: "Jon",
    quote: "Nobody does it better!",
    source: "Booksy",
    rating: 5,
    date: "Mar 19, 2026",
    serviceName: "Haircut",
    staffName: "Nate Gouty",
    confirmedClient: true,
    staffTags: ["all", "nate"],
  },
  {
    id: "rv-gary-2026",
    author: "Gary",
    quote: "Nate the Great.",
    source: "Booksy",
    rating: 5,
    date: "Mar 5, 2026",
    serviceName: "Haircut",
    staffName: "Nate Gouty",
    confirmedClient: true,
    staffTags: ["all", "nate"],
  },
  {
    id: "rv-kyle-2026",
    author: "Kyle",
    quote: "👍🏻",
    source: "Booksy",
    rating: 5,
    date: "Feb 25, 2026",
    serviceName: "Hair + Beard",
    staffName: "Jimmy Bissonette",
    confirmedClient: true,
    staffTags: ["all", "jimmy"],
  },
  {
    id: "rv-gavin-2026",
    author: "Gavin",
    quote: "Nate is the man",
    source: "Booksy",
    rating: 5,
    date: "Jan 4, 2026",
    serviceName: "Haircut",
    staffName: "Nate Gouty",
    confirmedClient: true,
    staffTags: ["all", "nate"],
  },
  {
    id: "rv-chris-2025",
    author: "Chris",
    quote:
      "Chill place. Nate and jimmy are the best. Won’t let anyone else touch my hair!",
    source: "Booksy",
    rating: 5,
    date: "Dec 20, 2025",
    serviceName: "Haircut",
    staffName: "Nate Gouty",
    confirmedClient: true,
    staffTags: ["all", "jimmy", "nate"],
  },
  {
    id: "rv-jacquelyn-2025",
    author: "Jacquelyn",
    quote:
      "Amazing, he did a fantastic job. we have been struggling to find a good barber for my boys and going through some bad cuts in thr mean time. Now they are looking fresh for thr holidays. love it. thank you",
    source: "Booksy",
    rating: 5,
    date: "Nov 26, 2025",
    serviceName: "Haircut",
    staffName: "Jimmy Bissonette",
    confirmedClient: true,
    staffTags: ["all", "jimmy"],
  },
  {
    id: "rv-jon-2025b",
    author: "Jon",
    quote: "Great people and great service.",
    source: "Booksy",
    rating: 5,
    date: "Nov 23, 2025",
    serviceName: "Haircut",
    staffName: "Jimmy Bissonette",
    confirmedClient: true,
    staffTags: ["all", "jimmy"],
  },
  {
    id: "rv-daniel-2025",
    author: "Daniel",
    quote: "Great service",
    source: "Booksy",
    rating: 5,
    date: "Nov 8, 2025",
    serviceName: "Beard Trim",
    staffName: "Nate Gouty",
    confirmedClient: true,
    staffTags: ["all", "nate"],
  },
  {
    id: "rv-tom-2025",
    author: "Tom",
    quote: "As always…Nate does an amazing job!",
    source: "Booksy",
    rating: 5,
    date: "Nov 5, 2025",
    serviceName: "Haircut",
    staffName: "Nate Gouty",
    confirmedClient: true,
    staffTags: ["all", "nate"],
  },
];
