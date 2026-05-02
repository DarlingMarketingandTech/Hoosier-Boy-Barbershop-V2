import { CLOUDINARY_ASSET_ROOT, MEDIA_PUBLIC_IDS } from "@/components/ui/media-assets";

const RESULTS_FOLDER = `${CLOUDINARY_ASSET_ROOT}/results`;

export const RESULTS_FALLBACK_PUBLIC_IDS: readonly string[] =
  MEDIA_PUBLIC_IDS.resultsFallback;

type CloudinarySearchResponse = {
  resources?: { public_id: string }[];
};

/**
 * Fetches the newest `maxResults` image public IDs from the Cloudinary `/results` folder.
 * Uses Admin Search REST with HTTP Basic auth (no extra npm dependency).
 * Falls back to committed IDs when credentials/network/search fail.
 */
export async function fetchLatestResultPublicIds(
  maxResults = 24
): Promise<string[]> {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud || !key || !secret) {
    return [...RESULTS_FALLBACK_PUBLIC_IDS].slice(0, maxResults);
  }

  try {
    const auth = Buffer.from(`${key}:${secret}`).toString("base64");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/resources/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          expression: `asset_folder="${RESULTS_FOLDER}" AND bytes>100000`,
          sort_by: [{ created_at: "desc" }],
          max_results: maxResults,
        }),
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) {
      return [...RESULTS_FALLBACK_PUBLIC_IDS].slice(0, maxResults);
    }

    const data = (await res.json()) as CloudinarySearchResponse;
    const ids =
      data.resources?.map((r) => r.public_id).filter(Boolean) ?? [];

    return ids.length >= Math.min(3, maxResults)
      ? ids.slice(0, maxResults)
      : [...RESULTS_FALLBACK_PUBLIC_IDS].slice(0, maxResults);
  } catch {
    return [...RESULTS_FALLBACK_PUBLIC_IDS].slice(0, maxResults);
  }
}
