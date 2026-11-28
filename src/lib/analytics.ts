export type AureonAnalyticsEvent =
  | "aureon_hero_cta"
  | "aureon_page_view"
  | "aureon_master_layout_view"
  | "aureon_plot_select"
  | "aureon_brochure_request"
  | "aureon_whatsapp_click"
  | "aureon_phone_click"
  | "aureon_enquiry_submit"
  | "aureon_site_visit_request";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackAureonEvent(
  event: AureonAnalyticsEvent,
  params: Record<string, string | number | boolean | undefined> = {}
): void {
  if (typeof window === "undefined") return;
  const payload = {
    event,
    project: "AUREON BREEZE",
    timestamp: new Date().toISOString(),
    ...params,
  };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  window.dispatchEvent(new CustomEvent("vvms_analytics", { detail: payload }));
}

export function getAttributionParams() {
  if (typeof window === "undefined") {
    return {
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      landingPage: null,
      referrer: null,
    };
  }
  const search = new URLSearchParams(window.location.search);
  return {
    utmSource: search.get("utm_source"),
    utmMedium: search.get("utm_medium"),
    utmCampaign: search.get("utm_campaign"),
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer || null,
  };
}
