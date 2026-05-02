/**
 * Booksy deep links — verified redirect from `dl/show-business` with `services[]`.
 * @see https://booksy.com/en-us/746827_hoosier-boy-barbershop_barber-shop_19578_noblesville
 */

export const BOOKSY_BUSINESS_ID = "746827";

const BOOKSY_DL_SHOW_BUSINESS = `https://booksy.com/en-us/dl/show-business/${BOOKSY_BUSINESS_ID}`;

/** Opens Booksy booking flow with the given numeric service id pre-selected. */
export function getBooksyServiceBookingUrl(booksyNumericServiceId: string): string {
  const u = new URL(BOOKSY_DL_SHOW_BUSINESS);
  u.searchParams.append("services[]", booksyNumericServiceId);
  return u.toString();
}

/** Short Booksy invite URL (new tab / deep link; not embeddable due to CSP). */
export function getBooksyShortEmbedUrl(booksyNumericServiceId: string): string {
  return `https://booksy.com/s/hoosier-boy-barbershop/${booksyNumericServiceId}?do=invite`;
}

export const BOOKSY_PROFILE_URL =
  "https://booksy.com/en-us/746827_hoosier-boy-barbershop_barber-shop_19578_noblesville?do=invite";
