import { getCookies, setCookie } from "@std/http";
import { removeNonLatin1Chars } from "apps/utils/normalize.ts";
import { Segment } from "apps/vtex/utils/types.ts";
import type { AppMiddlewareContext } from "./apps/site.ts";

/**
 * by default segment starts with null values
 */
const DEFAULT_SEGMENT: Partial<Segment> = {
  utmi_campaign: null,
  utmi_page: null,
  utmi_part: null,
  utm_campaign: null,
  utm_source: null,
  utm_medium: null,
  channel: "1",
  cultureInfo: "en-US",
  currencyCode: "OMR",
  currencySymbol: "$",
  countryCode: "OMN",
};

/**
 * Stable serialization.
 *
 * This means that even if the attributes are in a different order, the final segment
 * value will be the same. This improves cache hits
 */
const serialize = ({
  campaigns,
  channel,
  priceTables,
  regionId,
  utm_campaign,
  utm_source,
  utm_medium,
  utmi_campaign,
  utmi_page,
  utmi_part,
  currencyCode,
  currencySymbol,
  countryCode,
  cultureInfo,
  channelPrivacy,
}: Partial<Segment>) => {
  const seg = {
    campaigns,
    channel,
    priceTables,
    regionId,
    utm_campaign: utm_campaign &&
      removeNonLatin1Chars(utm_campaign).replace(/[\/\[\]{}()<>.]/g, ""),
    utm_source: utm_source &&
      removeNonLatin1Chars(utm_source).replace(/[\/\[\]{}()<>.]/g, ""),
    utm_medium: utm_medium &&
      removeNonLatin1Chars(utm_medium).replace(/[\/\[\]{}()<>.]/g, ""),
    utmi_campaign: utmi_campaign && removeNonLatin1Chars(utmi_campaign),
    utmi_page: utmi_page && removeNonLatin1Chars(utmi_page),
    utmi_part: utmi_part && removeNonLatin1Chars(utmi_part),
    currencyCode,
    currencySymbol,
    countryCode,
    cultureInfo,
    channelPrivacy,
  };
  return btoa(JSON.stringify(seg));
};

const parse = (cookie: string) => {
  try {
    return JSON.parse(atob(cookie)) as Segment;
  } catch {
    return null;
  }
};

export default function middleware(
  _props: unknown,
  req: Request,
  ctx: AppMiddlewareContext,
) {
  const supportedLanguages = ctx.supportedLanguages || ["en"];
  const defaultLanguage = ctx.defaultLanguage || "en";

  // const res = await ctx.next!();

  // console.log(res);

  // // Accessible from useSectionWithHref
  // res?.headers?.set(
  //   "__supported_languages",
  //   JSON.stringify(supportedLanguages),
  // );
  // res?.headers?.set("__default_language", defaultLanguage);

  const url = new URL(req.url);

  const path = url.pathname;
  const search = url.search;

  const [_, language] = path.split("/");

  const IGNORE_PATHS = ["/deco", "/api", "/live"];
  const IS_FILE = /\.[^.]+$/;

  if (
    IGNORE_PATHS.some((p) => path.startsWith(p)) ||
    path.startsWith("/_") ||
    IS_FILE.test(path) ||
    search.includes("__cb") // Admin preview uses __cb to override props and matchers
  ) {
    return ctx.next!();
  }

  const cookies = getCookies(req.headers);

  if (language && supportedLanguages.includes(language)) {
    const vtex_segment = cookies["vtex_segment"];
    const segmentFromCookie = vtex_segment ? parse(vtex_segment) : null;

    const cultureInfos = {
      "en": "en-US",
      "ar": "ar-OM",
    };

    const segment: Partial<Segment> = {
      ...DEFAULT_SEGMENT,
      ...segmentFromCookie,
      cultureInfo: cultureInfos[language as keyof typeof cultureInfos] ||
        DEFAULT_SEGMENT.cultureInfo,
    };
    const token = serialize(segment);

    if (vtex_segment !== token) {
      setCookie(ctx.response.headers, {
        value: token,
        name: "vtex_segment",
        path: "/",
        secure: true,
        httpOnly: true,
      });
    }

    setCookie(ctx.response.headers, {
      name: "language",
      value: language,
      path: "/",
      httpOnly: true,
    });
  } else {
    ctx.response.status = 302;
    ctx.response.headers.set(
      "Location",
      `/${cookies.language || defaultLanguage}${path}${search}`,
    );
  }

  if (_props && typeof _props === "object") {
    Object.assign(_props, {
      _language: language,
      _supportedLanguages: supportedLanguages,
      url: req.url,
    });
  }

  return ctx.next!();
}
