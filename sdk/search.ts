import { getCookies } from "@std/http";

export function getSearchHistory(headers: Headers) {
  const cookies = getCookies(headers);
  return cookies["search-history"]
    ?.split("|")
    ?.map((term) => term.trim())
    ?.filter((term) => term !== "") || [];
}
