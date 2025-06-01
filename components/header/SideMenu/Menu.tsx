import { SIDE_MENU_ID } from "../../../constants.ts";
import { clx } from "../../../sdk/clx.ts";
import Icon from "../../ui/Icon.tsx";
import LanguageSelector from "./LanguageSelector.tsx";
import MenuHeader from "./MenuHeader.tsx";
import MenuItem, { type MenuItemProps } from "./MenuItem.tsx";

interface Props {
  categories: MenuItemProps[];
}

export default function Menu({ categories }: Props) {
  return (
    <>
      <div
        data-state="closed"
        data-controlled-by={SIDE_MENU_ID}
        data-controller={SIDE_MENU_ID}
        class="fixed inset-0 z-50 bg-black/80 data-[state=closed]:opacity-0 data-[state=open]:opacity-100 data-[state=closed]:pointer-events-none data-[state=open]:pointer-events-auto transition-all duration-300"
      />
      <div
        role="dialog"
        data-state="closed"
        data-controlled-by={SIDE_MENU_ID}
        class={clx(
          "fixed right-0 border bottom-0 z-[100] mt-0 flex h-full w-[300px] touch-auto flex-col overflow-scroll !border-none bg-white data-[state=closed]:ltr:-left-[300px] data-[state=closed]:rtl:-right-[300px] transition-all duration-300 ltr:left-0 rtl:right-0 rounded-none",
        )}
        dir="ltr"
        tabIndex={-1}
      >
        <div class="mx-auto w-[100px] rounded-full bg-muted"></div>
        <div
          dir="ltr"
          class="relative overflow-hidden h-full bg-white"
          style="position: relative; --radix-scroll-area-corner-width: 0px; --radix-scroll-area-corner-height: 0px;"
        >
          <div
            data-radix-scroll-area-viewport=""
            class="h-full w-full rounded-[inherit]"
            style="overflow: hidden scroll;"
          >
            <div style="min-width: 100%; display: table;">
              <div
                class="h-full bg-white group"
                data-controlled-by="side-menu-view"
                data-state="menu"
              >
                <MenuHeader />
                <LanguageSelector />
                <div class="group-data-[state=menu]:block hidden">
                  <div
                    class="mb-[110px] w-full px-0 py-0"
                    data-orientation="vertical"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.label} {...category} />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  data-controller="side-menu-view"
                  data-value="language-selector"
                  class="absolute bottom-0 w-full bg-omantel-light-green px-4 py-6 text-black group-data-[state=menu]:block hidden"
                  dir="ltr"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex w-full items-center">
                      <Icon id="globe-outline" size={24} />
                      <div class="flex flex-col">
                        <span class="ml-3 text-sm">English</span>
                        <label class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-base font-medium">
                          OMR
                        </label>
                      </div>
                    </div>
                    <Icon id="chevron-right" size={24} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
