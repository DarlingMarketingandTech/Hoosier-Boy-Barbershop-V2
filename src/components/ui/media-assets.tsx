/**
 * Cloudinary delivery URLs + canonical public IDs for Hoosier Boy media.
 * Paths mirror Cloudinary asset folders under `hoosier-boy-barbershop/*`.
 * Safe to import from Client Components (uses NEXT_PUBLIC cloud name only).
 */

export const CLOUDINARY_ASSET_ROOT = "hoosier-boy-barbershop";

export const MEDIA_PUBLIC_IDS = {
  /** Single logo asset in folder — highest-res master (861×902 PNG). */
  logoMaster: "IMG_1673_1",
  jimmyPortrait: "jimmy-bio",
  /** Primary Nate portrait — 4000×3000. */
  natePortrait: "20230518_134718",
  /** Editorial lookbook fallbacks — newest six from `/results` (sync with MCP / search). */
  resultsFallback: [
    "f98c405ebd384bad88c1db718327f8-hoosier-boy-barbershop-inspiration-911ba0258b20416f9ed224ed22589b-booksy",
    "3fe932391a444a86877dc29756d4f0-hoosier-boy-barbershop-inspiration-be7e707b05b84d4fb0bbcbd46d1a5f-booksy",
    "256d8362eece4b0daf7ea97cf54577-hoosier-boy-barbershop-inspiration-5ae16cebe45f4f79a3f101408e1bcc-booksy",
    "7b57b814e26b45ccb9d5061d51e454-hoosier-boy-barbershop-inspiration-c32cad6830ba4dd8975cab53a62990-booksy",
    "5fe36c883e8a4350878109b305e402be_1",
    "618656543_18093070781479062_3715794425192548970_n",
  ],
  shopInteriorHero: "20230518_130223",
} as const;

export type CloudinaryTransformOptions = {
  /** Extra transformation segment, e.g. `w_800,q_auto:best` */
  transforms?: string[];
};

function getCloudName(): string {
  const name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!name) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set");
  }
  return name;
}

/** Build an optimized `https://res.cloudinary.com/.../upload/...` URL. */
export function cloudinaryImageUrl(
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const cloud = getCloudName();
  const baseTransforms = ["f_auto", "q_auto:best"];
  const merged = [...baseTransforms, ...(options.transforms ?? [])];
  const transformation = merged.filter(Boolean).join(",");
  const encodedId = publicId.split("/").map(encodeURIComponent).join("/");
  return `https://res.cloudinary.com/${cloud}/image/upload/${transformation}/${encodedId}`;
}

export function getMasterLogoUrlNavbar(): string {
  return cloudinaryImageUrl(MEDIA_PUBLIC_IDS.logoMaster, {
    transforms: ["h_44", "c_limit", "dpr_auto", "fl_png"],
  });
}

export function getMasterLogoUrlHero(): string {
  return cloudinaryImageUrl(MEDIA_PUBLIC_IDS.logoMaster, {
    transforms: ["w_720", "c_limit", "dpr_auto", "fl_png"],
  });
}

export function getMasterLogoUrlSchema(): string {
  return cloudinaryImageUrl(MEDIA_PUBLIC_IDS.logoMaster, {
    transforms: ["w_1200", "c_limit", "dpr_auto", "fl_png"],
  });
}

export function getBarberPortraitUrl(
  barber: "jimmy" | "nate",
  variant: "card" | "full" = "card"
): string {
  const id =
    barber === "jimmy"
      ? MEDIA_PUBLIC_IDS.jimmyPortrait
      : MEDIA_PUBLIC_IDS.natePortrait;
  const transforms =
    variant === "card"
      ? ["w_900", "h_1125", "c_fill", "g_auto", "dpr_auto"]
      : ["w_1600", "c_limit", "dpr_auto"];
  return cloudinaryImageUrl(id, { transforms });
}

export function getLookbookSlideUrl(publicId: string): string {
  return cloudinaryImageUrl(publicId, {
    transforms: ["w_1600", "h_2000", "c_fill", "g_auto", "dpr_auto"],
  });
}

export function getShopInteriorTextureUrl(): string {
  return cloudinaryImageUrl(MEDIA_PUBLIC_IDS.shopInteriorHero, {
    transforms: ["w_1920", "h_1080", "c_fill", "g_auto", "e_blur:1200", "q_auto:low"],
  });
}
