// One place for every contact detail and outbound link, so a changed number or
// listing never has to be hunted down across the header, the call bar, the
// booking form, the footer and the schema.org markup.

export const SITE_URL = "https://www.palmettotidecharters.com";
export const BUSINESS_NAME = "Palmetto Tide Charters";
export const CAPTAIN = "Captain Joseph Christy";

export const PHONE = "8434714767";
export const PHONE_E164 = "+18434714767";
export const PHONE_DISPLAY = "(843) 471-4767";
export const EMAIL = "palmettotidecharters@gmail.com";

export const INSTAGRAM_URL = "https://www.instagram.com/palmettotidecharters/";
export const INSTAGRAM_HANDLE = "@palmettotidecharters";
export const GOOGLE_REVIEWS_URL = "https://www.google.com/maps?cid=11335332628536409892";
export const FISHINGBOOKER_URL = "https://fishingbooker.com/charters/view/42857";

// Versioned: /images/* is cached immutable for a year, so a new share image
// needs a new filename to reach anyone.
export const OG_IMAGE = "/images/og/palmetto-tide-og-v2.jpg";

/**
 * An sms: link with a prefilled message.
 *
 * `?&body=` is deliberate: Android reads the query string (`?body=`) and iOS
 * reads `&body=`, and each ignores the half it does not understand, so one
 * link prefills the message on both.
 */
export const smsHref = (body?: string) =>
  body ? `sms:${PHONE_E164}?&body=${encodeURIComponent(body)}` : `sms:${PHONE_E164}`;

export const mailHref = (subject?: string, body?: string) => {
  const params = [
    subject && `subject=${encodeURIComponent(subject)}`,
    body && `body=${encodeURIComponent(body)}`,
  ].filter(Boolean);
  return `mailto:${EMAIL}${params.length ? `?${params.join("&")}` : ""}`;
};
