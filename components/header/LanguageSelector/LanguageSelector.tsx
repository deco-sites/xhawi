import { HEADER_LANGUAGE_SELECTOR_ID } from "../../../constants.ts";
import LanguageSelectorButton from "./Button.tsx";
import LanguageSelectorPopup from "./Popup.tsx";

interface Props {
  labels: {
    currentLanguage: string;
    omr: string;
    changeLanguage: string;
  };
  dir: "ltr" | "rtl";
  arUrl: string;
  enUrl: string;
  currentLanguage: string;
}

export default function LanguageSelector(props: Props) {
  const { labels, dir, arUrl, enUrl, currentLanguage } = props;
  return (
    <>
      <div class="relative">
        <LanguageSelectorButton labels={labels} />
        <LanguageSelectorPopup
          dir={dir}
          labels={labels}
          arUrl={arUrl}
          enUrl={enUrl}
          currentLanguage={currentLanguage}
        />
      </div>
      <button
        type="button"
        class="fixed z-[49] inset-0 data-[state=closed]:hidden"
        data-controller={HEADER_LANGUAGE_SELECTOR_ID}
        data-controlled-by={HEADER_LANGUAGE_SELECTOR_ID}
        data-state="closed"
      />
    </>
  );
}
