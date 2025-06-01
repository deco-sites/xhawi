import { Suggestion } from "apps/commerce/types.ts";
import { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { getSearchHistory } from "../../../sdk/search.ts";
import { useComponent } from "../../../sections/Component.tsx";
import SearchResult from "./SearchResult.tsx";
import TopSearches from "./TopSearches.tsx";

interface Props {
  topSearches?: Suggestion;
  search?: Suggestion;
  query?: string;
  history?: string[];
}

export async function loader(props: Props, req: Request, ctx: AppContext) {
  const hasForm =
    req.headers.get("Content-Type") === "application/x-www-form-urlencoded";

  const query = hasForm
    ? (await req.formData()).get("q")?.toString()
    : props?.query;

  const history = getSearchHistory(req.headers);

  if (query) {
    const search = await ctx.invoke.vtex.loaders.legacy.suggestions({
      query: query.toString(),
      count: 12,
    });

    return {
      ...props,
      query,
      search,
      history,
    };
  }

  const topSearches = await ctx.invoke.vtex.loaders.intelligentSearch
    .topsearches();

  return {
    ...props,
    topSearches,
    history,
  };
}

export const importMetaURL = import.meta.url;

export default function Suggestions(props: Props) {
  const {
    topSearches = null,
    search = null,
    query,
    history = [],
  } = props;

  const htmxProps = topSearches === null && !query
    ? {
      "hx-get": useComponent(importMetaURL),
      "hx-trigger": "intersect once",
      "hx-target": "#suggestions",
      "hx-swap": "innerHTML",
      "hx-select": "#suggestions>*",
    }
    : undefined;

  return (
    <div
      {...htmxProps}
      id="suggestions"
      tabindex={0}
      data-controlled-by="search-input"
      data-state="closed"
      class={clx(
        "absolute hidden data-[state=open]:block left-[0.5rem] z-50 mt-[-0.15rem] h-auto max-h-144 w-[calc(100%-1.3rem)] overflow-x-auto rounded-b-[4px] border bg-white p-6 text-black lg:left-[0] lg:w-[calc(100%)]",
        !query && "min-h-24",
      )}
    >
      {query
        ? <SearchResult search={search} query={query} />
        : <TopSearches topSearches={topSearches} history={history} />}
    </div>
  );
}
