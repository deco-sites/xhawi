import { useDevice } from "@deco/deco/hooks";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { importMetaURL as importMetaURLSuggestions } from "./Suggestions.tsx";

interface Props {
  search?: string;
  placeholder?: string;
}

export default function Input(props: Props) {
  const { search, placeholder = "What are you looking for ?" } = props;
  const isMobile = useDevice() !== "desktop";

  return (
    <div class="relative z-50 w-full">
      <input
        type="search"
        class="valid:placeholder-shown:border-gray-200 focus-visible:ring-omantel-dark-green disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 focus:border-omantel-dark-green valid:border-omantel-faded-black valid:text-omantel-faded-black focus:valid:text-omantel-grey-3 z-20 block h-[45px] w-full rounded-sm border border-s-gray-50 bg-gray-50 p-2.5 pl-[19px] text-sm text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-tl-sm"
        id="search"
        name="q"
        placeholder={placeholder}
        value={search}
        maxlength={50}
        required
        data-controller="search-input"
        data-state="closed"
        data-behavior="open-only"
        hx-post={useComponent(import.meta.resolve(importMetaURLSuggestions))}
        hx-trigger="keyup changed delay:500ms"
        hx-target="#suggestions"
        hx-swap="innerHTML"
        hx-select="#suggestions>*"
        hx-sync="#suggestions:replace"
      />
      <button
        class="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 absolute end-0 top-0 h-full rounded-[4px] bg-black p-2.5 text-sm font-medium text-white hover:bg-omantel-dark-green active:bg-omantel-dark-green ltr:rounded-bl-none ltr:rounded-tl-none rtl:rounded-br-none rtl:rounded-tr-none dark:bg-omantel-electric-green dark:hover:bg-omantel-electric-green lg:bg-omantel-electric-green"
        id="searchBtn"
        type="submit"
      >
        {isMobile
          ? (
            <Icon
              alt="search"
              id="search-md"
              size={20}
            />
          )
          : (
            <Icon
              id="seller-search"
              size={20}
              class="text-black"
            />
          )}
      </button>
    </div>
  );
}
