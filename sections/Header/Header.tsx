import { useDevice } from "@deco/deco/hooks";
import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import LanguageSelector from "../../components/header/LanguageSelector/LanguageSelector.tsx";
import Navbar from "../../components/header/Navbar/Navbar.tsx";
import Profile from "../../components/header/Profile/Profile.tsx";
import Search from "../../components/header/Search/Search.tsx";
import SideMenuButton from "../../components/header/SideMenu/Button.tsx";
import Menu from "../../components/header/SideMenu/Menu.tsx";
import type { MenuItemProps } from "../../components/header/SideMenu/MenuItem.tsx";
import MinicartButton from "../../components/minicart/Button.tsx";
import { useI18n } from "../../sdk/i18n.ts";
import { getSearchHistory } from "../../sdk/search.ts";

interface Props {
  logo: {
    src: ImageWidget;
    alt: string;
    width: number;
    height: number;
  };
  categories: MenuItemProps[];
  search?: {
    placeholder?: string;
    /**
     * @ignore
     */
    history?: string[];
    /**
     * @ignore
     */
    search?: string;
  };
}

export function loader(props: Props, req: Request) {
  const history = getSearchHistory(req.headers);

  const url = new URL(req.url);
  const search = url.searchParams.get("q");

  return {
    ...props,
    search: {
      ...props.search,
      history,
      search,
    },
  };
}

export default function Header(props: Props) {
  const { logo, categories, search } = props;
  const isMobile = useDevice() !== "desktop";
  const { translations, dir, currentUrl, language, goTo } = useI18n(props);

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
            <a id="logoLink" href={goTo("/", language)}>
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
        <Search
          placeholder={search?.placeholder}
          history={search?.history}
          search={search?.search}
        />
        <div
          role="group"
          class="col-start-3 row-start-1 flex-row justify-end gap-1 pr-1.5 lg:min-w-[20%] lg:justify-end lg:gap-3 lg:bg-transparent lg:pr-0 flex"
        >
          <Profile
            labels={{
              hi: translations.header.hi,
              guest: translations.header.guest,
              account: translations.header.account,
              signIn: translations.header.signIn,
              newUser: translations.header.newUser,
              signUp: translations.header.signUp,
            }}
          />
          <LanguageSelector
            labels={{
              currentLanguage: translations.currentLanguage,
              omr: translations.menu.omr,
              changeLanguage: translations.menu.changeLanguage,
            }}
            dir={dir}
            arUrl={currentUrl("ar")}
            enUrl={currentUrl("en")}
            currentLanguage={language}
          />
          <div
            role="menubar"
            tabindex={0}
            data-orientation="horizontal"
            style="outline:none"
          >
            <div class="flex items-center">
              <MinicartButton dir={dir} />
            </div>
          </div>
        </div>
      </div>
      {isMobile
        ? (
          <Menu
            categories={categories}
            labels={{
              currentLanguage: translations.currentLanguage,
              menuHeader: translations.menu.header,
              omr: translations.menu.omr,
              backToMenu: translations.menu.backToMenu,
              changeLanguage: translations.menu.changeLanguage,
            }}
            dir={dir}
            currentLanguage={language}
            enUrl={currentUrl("en")}
            arUrl={currentUrl("ar")}
          />
        )
        : <Navbar dir={dir} items={categories} />}
    </>
  );
}

// @ts-expect-error type this later
export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);
