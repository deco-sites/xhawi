import Suggestions from "./Suggestions.tsx";
import Input from "./Input.tsx";

export interface SearchProps {
  placeholder?: string;
  /**
   * @ignore
   */
  search?: string;
  /**
   * @ignore
   */
  history?: string[];
}

export default function Search(props: SearchProps) {
  const { placeholder, search, history } = props;

  return (
    <div
      role="group"
      class="col-span-3 col-start-1 row-start-2 !ml-0 h-full w-full flex-row justify-around bg-omantel-dark-green p-3 lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:min-w-[60%] lg:flex-row lg:justify-start lg:bg-transparent lg:rtl:pl-[80px] flex"
    >
      <form
        class="lg:ltr:-ml-[40px] lg:rtl:-mr-[20px] flex w-full items-center justify-center lg:w-[99%]"
        autocomplete="off"
        action="/s"
      >
        <div class="relative w-full pl-2 pr-3 lg:px-0">
          <Input
            placeholder={placeholder}
            search={search}
          />
          <Suggestions history={history} query={search} />
        </div>
      </form>
      <button
        type="button"
        data-controller="search-input"
        data-controlled-by="search-input"
        data-state="closed"
        tabIndex={0}
        class="absolute hidden data-[state=open]:block left-0 top-0 z-[40] h-full w-full overscroll-none bg-gray-900 opacity-30"
      >
      </button>
    </div>
  );
}
