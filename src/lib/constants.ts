export interface Barber {
  id: string;
  name: string;
  title: string;
  bio: string;
  imagePlaceholder: string;
  specialty: string;
  /** Instagram handle without the @ symbol */
  instagram: string;
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
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  phone: string;
  hours: {
    display: string;
    /** ISO 8601 day-of-week open/close, e.g. "Mo-Fr 09:00-19:00" */
    schema: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  bookingUrl: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // minutes
  category: "cut" | "shave" | "treatment";
}

export const BARBERS: Barber[] = [
  {
    id: "marcus-wells",
    name: "Marcus Wells",
    title: "Master Barber & Founder",
    bio: "With over 15 years behind the chair, Marcus brings old-school precision and modern artistry to every cut. Trained in Chicago's south side and certified in straight-razor technique, his work speaks for itself.",
    imagePlaceholder: "/barbers/marcus-wells.jpg",
    specialty: "Master of the Straight Razor",
    instagram: "marcuswells.cuts",
  },
  {
    id: "drew-callahan",
    name: "Drew Callahan",
    title: "Senior Barber",
    bio: "Drew is the new blood with an old soul. Armed with a degree in cosmetology and a relentless passion for the craft, he specialises in textured cuts and beard sculpting that define a man's character.",
    imagePlaceholder: "/barbers/drew-callahan.jpg",
    specialty: "Architect of the Modern Fade",
    instagram: "drewcallahan.barbershop",
  },
];

export const SERVICES: Service[] = [
  {
    id: "the-bear-repair",
    name: "The Bear Repair",
    description:
      "Full-service transformation: precision haircut, hot-towel beard shaping, scalp massage, and a finishing pomade style. The complete Hoosier Boy experience.",
    price: 65,
    duration: 75,
    category: "cut",
  },
  {
    id: "classic-cut",
    name: "Classic Cut",
    description:
      "A timeless scissor-over-comb cut tailored to your bone structure and lifestyle. Includes a hot-towel neck finish and premium styling product.",
    price: 35,
    duration: 45,
    category: "cut",
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    description:
      "The full ritual. Steamed hot towels, pre-shave oil, straight-razor precision, and a cold-water close. Old-world luxury for the modern gentleman.",
    price: 40,
    duration: 45,
    category: "shave",
  },
  {
    id: "fade-and-lineup",
    name: "Fade & Line-Up",
    description:
      "Crisp skin-to-hair fade blended with surgical edge work. Your edges will be so clean they need their own zip code.",
    price: 30,
    duration: 35,
    category: "cut",
  },
  {
    id: "scalp-treatment",
    name: "Scalp Ritual Treatment",
    description:
      "A deep-cleanse scalp exfoliation followed by a nourishing oil massage. Promotes healthy hair growth and leaves you feeling grounded and refreshed.",
    price: 25,
    duration: 30,
    category: "treatment",
  },
];

export const SITE_CONFIG = {
  name: "Hoosier Boy",
  tagline: "Classic Cuts. Modern Craft.",
  bookingUrl: "#book",
};

/** Structured shop metadata — used by JSON-LD, footer, and contact components */
export const SHOP_META: ShopMeta = {
  name: "Hoosier Boy Barbershop",
  address: {
    street: "1234 N Illinois St",
    city: "Indianapolis",
    state: "IN",
    zip: "46204",
    country: "US",
  },
  phone: "(317) 555-0192",
  hours: {
    display: "Tue–Sat: 9am – 7pm",
    schema: "Tu-Sa 09:00-19:00",
  },
  coordinates: {
    lat: 39.7684,
    lng: -86.158,
  },
  bookingUrl: "#book",
};

/** High-end testimonials sourced from Booksy reviews */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    author: "Jordan M.",
    quote:
      "Marcus took one look at my face shape and delivered the sharpest taper I've ever walked out with. The hot-towel finish alone is worth the drive across town.",
    source: "Booksy",
    rating: 5,
  },
  {
    id: "t2",
    author: "Caleb R.",
    quote:
      "This isn't a barbershop — it's a ritual. Drew's beard sculpt was surgical. I've been to shops in NYC and Chicago; Hoosier Boy beats them all.",
    source: "Booksy",
    rating: 5,
  },
  {
    id: "t3",
    author: "Trevor S.",
    quote:
      "The Bear Repair is exactly what it promises: a full transformation. Walk in looking rough, walk out looking like you own the room. Five stars every single time.",
    source: "Booksy",
    rating: 5,
  },
];
