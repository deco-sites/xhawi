import { Suggestion } from "apps/commerce/types.ts";
import Icon from "../../ui/Icon.tsx";
import SearchHistory from "./SearchHistory.tsx";

interface TopSearchesProps {
  topSearches: Suggestion | null;
  history?: string[];
}

export default function TopSearches(props: TopSearchesProps) {
  const { topSearches = null, history = [] } = props;

  return (
    <>
      <SearchHistory history={history} />
      <br class="border" />
      <div>
        <h3 class="flex items-center font-medium">
          Top Searches{" "}
          <Icon
            id="trend-up"
            size={18}
            class="ml-2"
          />
        </h3>
        <ul class="">
          {topSearches?.searches?.map(({ term }) => (
            <li class="row mb-1.5 flex">
              <a hreflang="en-US" href={`/en/search?q=${term}`}>
                {term}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
