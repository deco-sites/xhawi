import { useScript } from "@deco/deco/hooks";
import Icon from "../../ui/Icon.tsx";

interface Props {
  history: string[];
}

export default function SearchHistory(props: Props) {
  const { history } = props;

  return (
    <div>
      <div class="row flex justify-between items-center">
        <h3 class="font-medium">Search History</h3>
        <button
          type="button"
          hx-on:click={useScript(() => {
            document.cookie = "search-history=";
            const searchHistory = document.getElementById("search-history");
            if (searchHistory) {
              searchHistory.innerHTML = "";
            }
          })}
          class="inline-flex items-center justify-center whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 loader-exception h-auto cursor-pointer p-0 text-sm font-semibold text-omantel-secondary-blue hover:no-underline"
        >
          Clear all
        </button>
      </div>
      <ul
        class="mt-2 flex flex-wrap border-b border-omantel-platinum"
        id="search-history"
      >
        {history.map((term) => (
          <li
            id={term}
            class="row my-1 mr-2 flex justify-between items-center rounded-sm bg-omantel-light-green p-1"
          >
            <a
              hreflang="en-US"
              class="mr-1 pl-2 text-sm"
              href={`/en/search?q=${term}`}
            >
              {term}
            </a>
            <button
              type="button"
              hx-on:click={useScript((term: string) => {
                const cookies = document.cookie.split(";");
                const searchHistory = cookies.find((cookie) =>
                  cookie.trim().startsWith("search-history=")
                )?.split("=")[1];
                if (searchHistory) {
                  const newHistory = searchHistory.split("|").filter((t) =>
                    t !== term
                  ).join("|");
                  document.cookie = `search-history=${newHistory}`;
                }

                const searchHistoryEl = document.getElementById(term);
                if (searchHistoryEl) {
                  searchHistoryEl.remove();
                }
              }, term)}
            >
              <Icon
                id="close-small"
                size={8}
                class="mx-2 cursor-pointer text-[#545454]"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
