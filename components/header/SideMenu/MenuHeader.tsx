import { SIDE_MENU_ID } from "../../../constants.ts";
import Icon from "../../ui/Icon.tsx";

export default function MenuHeader() {
  return (
    <div
      class="flex justify-between bg-omantel-electric-green px-4 py-4 text-black pl-1"
      dir="ltr"
    >
      <div class="grid gap-1.5 p-4 text-center sm:text-left">
        <h2
          id="radix-:R369svaH1:"
          class="text-lg font-semibold leading-none tracking-tight"
        >
          <div class="text-base font-medium">
            Browse Marketplace
          </div>
        </h2>
      </div>
      <button
        data-controller={SIDE_MENU_ID}
        aria-popover="menu"
        type="button"
      >
        <Icon id="close" size={14} />
      </button>
    </div>
  );
}
