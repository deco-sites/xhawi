import { HEADER_LANGUAGE_SELECTOR_ID } from "../../../constants.ts";
import Icon from "../../ui/Icon.tsx";

interface Props {
  labels: {
    currentLanguage: string;
    omr: string;
  };
}

export default function LanguageSelectorButton(props: Props) {
  const { labels } = props;

  return (
    <button
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      aria-expanded="false"
      data-state="closed"
      class="cursor-default select-none items-center rounded-sm text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]: hidden min-w-[85px] p-1 font-light hover:bg-transparent focus:bg-transparent focus:text-white lg:flex [&[aria-expanded='false']]:text-white [&[aria-expanded='true']]:bg-omantel-grey [&[aria-expanded='true']]:text-white"
      tabindex={-1}
      data-controller={HEADER_LANGUAGE_SELECTOR_ID}
    >
      <div class="flex items-center">
        <Icon size={24} id="globe" />
        <div class="flex w-14 flex-col items-start">
          <span class="col-span-2 px-2 text-xs en">
            {labels.currentLanguage}
          </span>
          <label class="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-md col-span-2 col-start-2 row-start-2 px-2">
            {labels.omr}
          </label>
        </div>
      </div>
    </button>
  );
}
