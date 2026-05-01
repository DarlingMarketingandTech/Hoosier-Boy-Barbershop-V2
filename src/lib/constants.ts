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

export interface Testimonial {
  id: string;
  author: string;
  quote: string;
  source: "Booksy" | "Google" | "Yelp";
  rating: 5;
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
    name: "Jimmy Griffin",
    title: "Barber · Classic Specialist",
    bio: "Jimmy delivers clean, structured classics with barbershop discipline — scissor-over-comb tailoring, crisp lines, and beard work that respects your growth pattern. If you want a cut that ages well and a beard that behaves, you’re in his chair.",
    imagePlaceholder: "/barbers/jimmy.jpg",
    specialty: "Classic Cut & Beard Architecture",
    instagram: "hoosierboybarber",
    serviceIds: ["classic-cut", "beard-trim-jimmy"],
  },
  {
    id: "nate",
    name: "Nate Shepherd",
    title: "Specialist / Senior Barber",
    bio: "Nate pairs senior-level fading and finishing with an educator’s eye for detail — precise transitions, honest consultations, and finishes that hold up in the real world. He also leads Hoosier Boy’s Non-Surgical Hair Replacement program with clinical-grade patience.",
    imagePlaceholder: "/barbers/nate.jpg",
    specialty: "Senior Fades · NSHR Lead",
    instagram: "hoosierboybarber",
    serviceIds: ["haircut-nate", "beard-trim-nate"],
  },
];

/** Core haircut & beard menu */
export const SERVICES: Service[] = [
  {
    id: "classic-cut",
    name: "Classic Cut",
    description:
      "Tailored scissor-and-clipper balance with neck cleanup and styled finish — Jimmy’s signature discipline.",
    price: 45,
    duration: 45,
    category: "cut",
  },
  {
    id: "beard-trim-jimmy",
    name: "Beard Trim",
    description:
      "Shape, taper, and hot-towel polish so your beard reads intentional — not accidental.",
    price: 45,
    duration: 30,
    category: "shave",
  },
  {
    id: "haircut-nate",
    name: "Haircut",
    description:
      "Senior-grade consultation and precision finishing — skin-tight blends, refined tapering, executive polish.",
    price: 50,
    duration: 45,
    category: "cut",
  },
  {
    id: "beard-trim-nate",
    name: "Beard Trim",
    description:
      "Line restoration, cheek tapering, and blade-clean edges finished like equipment — not guesswork.",
    price: 50,
    duration: 30,
    category: "shave",
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
}

export const NSHR_SERVICES: NSHRService[] = [
  {
    id: "nshr-consult",
    code: "NSHR-CONSULT",
    name: "Consultation",
    description:
      "Private scalp assessment, density mapping, lifestyle fit, and a written plan before any installation work begins.",
    durationMin: 30,
  },
  {
    id: "nshr-install",
    code: "NSHR-INSTALL",
    name: "Installation",
    description:
      "Medical-grade adhesion + directional styling pass so the unit disappears into your existing profile.",
    durationMin: 120,
  },
  {
    id: "nshr-maintain",
    code: "NSHR-MAINTAIN",
    name: "Maintenance",
    description:
      "Re-bond edges, fiber refresh, and detailing so the system stays invisible week after week.",
    durationMin: 60,
  },
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
  phone: "(317) 555-0192",
  hours: {
    display:
      "Tue–Sat · 8:00 AM – 11:00 AM · 11:30 AM – 2:00 PM · Closed Sun–Mon",
  },
  coordinates: {
    lat: 40.04552,
    lng: -86.01381,
  },
  bookingUrl: "https://www.booksy.com/en-us/hoosierboybarber",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Marcus T.",
    quote:
      "Jimmy lined me up with an old-school classic that still looks sharp two weeks later. The beard trim alone changed how my suits fit.",
    source: "Booksy",
    rating: 5,
  },
  {
    id: "t2",
    author: "Chris L.",
    quote:
      "Nate’s fade work is surgical — zero bulk, perfect weight line. Most importantly he listens before he picks up the clippers.",
    source: "Booksy",
    rating: 5,
  },
  {
    id: "t3",
    author: "Jordan P.",
    quote:
      "First shop in Noblesville where the vibe matches the skill. Hot towels, sharp lines, and zero chaos.",
    source: "Google",
    rating: 5,
  },
];
