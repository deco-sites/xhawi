import { HEADER_LANGUAGE_SELECTOR_ID } from "../../../constants.ts";
import { LanguageButton } from "../SideMenu/LanguageSelector.tsx";

interface Props {
  dir: "ltr" | "rtl";
  labels: {
    changeLanguage: string;
  };
  arUrl: string;
  enUrl: string;
  currentLanguage: string;
}

export default function LanguageSelectorPopup(props: Props) {
  const { dir, labels, arUrl, enUrl, currentLanguage } = props;

  return (
    <div
      dir={dir}
      data-controlled-by={HEADER_LANGUAGE_SELECTOR_ID}
      data-state="closed"
      class="absolute left-1/2 ltr:-translate-x-[52%] rtl:left-0 top-[calc(100%+8px)] min-w-max z-50 data-[open=closed]:hidden"
    >
      <div
        data-controlled-by={HEADER_LANGUAGE_SELECTOR_ID}
        role="menu"
        data-state="closed"
        dir={dir}
        class="z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:hidden data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 slide-in-from-top-2 mr-4 mt-4 w-80 rounded-t-none p-2 lg:mt-[12px] lg:rtl:-ml-[70px]"
        tabindex={-1}
        style="outline: none;"
      >
        <div dir={dir}>
          <div
            class="px-2 py-1.5 text-base font-normal text-omantel-font-grey"
            id="language"
          >
            {labels.changeLanguage}
          </div>
          <div
            role="radiogroup"
            aria-required="false"
            dir={dir}
            class="grid gap-2"
            tabindex={0}
            style="outline: none;"
          >
            <div class="flex items-center space-x-2 p-2">
              <LanguageButton checked={currentLanguage === "en"} />
              <a
                href={enUrl}
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 rtl: pr-3"
                id="languageEnglishText"
              >
                ENG-English
              </a>
            </div>
            <div class="flex items-center space-x-2 p-2">
              <LanguageButton checked={currentLanguage === "ar"} />
              <a
                href={arUrl}
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 rtl:pr-3"
                id="languageArabicText"
              >
                AR-العربية
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
