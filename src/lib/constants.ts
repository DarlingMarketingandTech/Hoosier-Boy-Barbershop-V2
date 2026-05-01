export interface Barber {
  id: string;
  name: string;
  title: string;
  bio: string;
  imagePlaceholder: string;
  specialty: string;
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
    specialty: "Fade Architecture & Hot Towel Shaves",
  },
  {
    id: "drew-callahan",
    name: "Drew Callahan",
    title: "Senior Barber",
    bio: "Drew is the new blood with an old soul. Armed with a degree in cosmetology and a relentless passion for the craft, he specialises in textured cuts and beard sculpting that define a man's character.",
    imagePlaceholder: "/barbers/drew-callahan.jpg",
    specialty: "Textured Cuts & Beard Sculpting",
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
  address: "Indianapolis, IN",
  phone: "(317) 555-0192",
  hours: "Tue–Sat: 9am – 7pm",
  bookingUrl: "#book",
};
