import { Suggestion } from "apps/commerce/types.ts";

interface Props {
  search: Suggestion | null;
  query: string;
}

export default function SearchResult(props: Props) {
  const { search, query } = props;

  const productTerms =
    search?.products?.map((p) => p.name?.toLowerCase()).filter((
      str,
    ): str is string => !!str) || [];
  const searchTerms =
    search?.searches?.map((s) => s.term).filter((str): str is string =>
      !!str
    ) || [];

  return (
    <ul>
      {[...searchTerms, ...productTerms].map((term) => (
        <li class="row flex py-1">
          <a
            hreflang="en-US"
            class="pl-2.5 font-bold"
            href={`/en/search?q=${term}`}
            dangerouslySetInnerHTML={{
              __html: term.replace(
                query,
                `<span class="font-normal">${query}</span>`,
              ),
            }}
          />
        </li>
      ))}
    </ul>
  );
}
