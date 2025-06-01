import { useDevice } from "@deco/deco/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Navbar from "../../components/header/Navbar/Navbar.tsx";
import Profile from "../../components/header/Profile/Profile.tsx";
import SideMenuButton from "../../components/header/SideMenu/Button.tsx";
import Menu from "../../components/header/SideMenu/Menu.tsx";
import type { MenuItemProps } from "../../components/header/SideMenu/MenuItem.tsx";
import MinicartButton from "../../components/minicart/Button.tsx";
import Icon from "../../components/ui/Icon.tsx";
interface Props {
  logo: {
    src: ImageWidget;
    alt: string;
    width: number;
    height: number;
  };
  categories: MenuItemProps[];
}

export default function Header({ logo, categories }: Props) {
  const isMobile = useDevice() !== "desktop";

  return (
    <>
      <div
        role="menubar"
        class="items-center space-x-1 z-50 h-min max-h-[120px] min-h-[70px] w-full rounded-none border-0 bg-black p-0 text-white lg:p-1 lg:px-12 lg:py-3 grid grid-cols-3 grid-rows-2 justify-center gap-2 lg:flex lg:grid-cols-6 lg:grid-rows-1 lg:gap-0"
        tabIndex={0}
        data-orientation="horizontal"
        style="outline:none"
      >
        <div
          role="group"
          class="col-span-2 flex flex-row gap-4 pl-2.5 lg:col-span-1 lg:min-w-[20%] lg:pl-0"
        >
          <SideMenuButton />
          <div class="logo-container" id="logoContainer">
            <a hreflang="en-US" id="logoLink" href="/en">
              <Image
                alt={logo.alt}
                id="logo"
                fetchPriority="high"
                width={logo.width}
                height={logo.height}
                decoding="async"
                data-nimg="1"
                class="logo h-[20px] w-[116px] lg:h-[30px] lg:w-[174px]"
                src={logo.src}
              />
            </a>
          </div>
        </div>
        <div
          role="group"
          class="col-span-3 col-start-1 row-start-2 !ml-0 h-full w-full flex-row justify-around bg-omantel-dark-green p-3 lg:col-span-4 lg:col-start-2 lg:row-start-1 lg:min-w-[60%] lg:flex-row lg:justify-start lg:bg-transparent lg:rtl:pl-[80px] flex"
        >
          <form
            class="lg:ltr:-ml-[40px] lg:rtl:-mr-[20px] flex w-full items-center justify-center lg:w-[99%]"
            autocomplete="off"
          >
            <div class="relative w-full pl-2 pr-3 lg:px-0">
              <div class="relative z-50 w-full">
                <input
                  type="search"
                  class="valid:placeholder-shown:border-gray-200 focus-visible:ring-omantel-dark-green disabled:cursor-not-allowed disabled:opacity-50 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300 focus:border-omantel-dark-green valid:border-omantel-faded-black valid:text-omantel-faded-black focus:valid:text-omantel-grey-3 z-20 block h-[45px] w-full rounded-sm border border-s-gray-50 bg-gray-50 p-2.5 pl-[19px] text-sm text-gray-900 ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 dark:border-s-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 rounded-tl-sm"
                  id="search"
                  placeholder="What are you looking for ?"
                  maxlength={50}
                  required
                />
                <button
                  class="inline-flex items-center justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 absolute end-0 top-0 h-full rounded-[4px] bg-black p-2.5 text-sm font-medium text-white hover:bg-omantel-dark-green active:bg-omantel-dark-green ltr:rounded-bl-none ltr:rounded-tl-none rtl:rounded-br-none rtl:rounded-tr-none dark:bg-omantel-electric-green dark:hover:bg-omantel-electric-green lg:bg-omantel-electric-green"
                  id="searchBtn"
                  type="submit"
                >
                  <Icon
                    id="seller-search"
                    size={20}
                    class="hidden lg:block text-black"
                  />
                  <Icon
                    alt="search"
                    id="search-md"
                    size={20}
                    class="block lg:hidden"
                  />
                </button>
              </div>
              <div
                role="button"
                tabindex={0}
                class="absolute hidden min-h-24 left-[0.5rem] z-50 mt-[-0.15rem] h-auto max-h-144 w-[calc(100%-1.3rem)] overflow-x-auto rounded-b-[4px] border bg-white p-6 text-black lg:left-[0] lg:w-[calc(100%)]"
              >
                <div class="block">
                  <div>
                    <div class="row flex justify-between">
                      <h3 class="font-medium">Search History</h3>
                    </div>
                    <ul class="mt-2 flex flex-wrap border-b border-omantel-platinum">
                    </ul>
                  </div>
                  <br class="border" />
                  <div>
                    <h3 class="flex font-medium">
                      Top Searches{" "}
                      <img
                        alt="delete"
                        loading="lazy"
                        width="18"
                        height="18"
                        decoding="async"
                        data-nimg="1"
                        class="ml-2"
                        style="color:transparent"
                        src="/icons/trend-up.svg"
                      />
                    </h3>
                    <ul class=""></ul>
                  </div>
                </div>
                <div class="hidden">
                  <ul></ul>
                </div>
              </div>
            </div>
          </form>
          <div
            role="button"
            tabIndex={0}
            class="absolute hidden left-0 top-0 z-[40] h-full w-full overscroll-none bg-gray-900 opacity-30"
          >
          </div>
        </div>
        <div
          role="group"
          class="col-start-3 row-start-1 flex-row justify-end gap-1 pr-1.5 lg:min-w-[20%] lg:justify-end lg:gap-3 lg:bg-transparent lg:pr-0 flex"
        >
          <Profile />
          <button
            type="button"
            role="menuitem"
            id="radix-:R5e9svaH1:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
            class="cursor-default select-none items-center rounded-sm text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]: hidden min-w-[85px] p-1 font-light hover:bg-transparent focus:bg-transparent focus:text-white lg:flex [&[aria-expanded='false']]:text-white [&[aria-expanded='true']]:bg-omantel-grey [&[aria-expanded='true']]:text-white"
            tabindex={-1}
            data-orientation="horizontal"
            data-radix-collection-item=""
          >
            <div class="flex items-center">
              <Icon size={24} id="globe" />
              <div class="flex w-14 flex-col items-start">
                <span class="col-span-2 px-2 text-xs en">English</span>
                <label class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-md col-span-2 col-start-2 row-start-2 px-2">
                  OMR
                </label>
              </div>
            </div>
          </button>
          <div
            role="menubar"
            tabindex={0}
            data-orientation="horizontal"
            style="outline:none"
          >
            <div class="flex items-center">
              <MinicartButton />
            </div>
          </div>
        </div>
      </div>
      {isMobile ? <Menu categories={categories} /> : <Navbar />}
    </>
  );
}

// @ts-expect-error type this later
export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);
