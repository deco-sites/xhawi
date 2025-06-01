import { MINICART_POPUP_ID } from "../../constants.ts";
import Icon from "../ui/Icon.tsx";

export default function MinicartButton() {
  return (
    <button
      data-controller={MINICART_POPUP_ID}
      type="button"
      role="menuitem"
      id="radix-:R5u9svaH1:"
      aria-haspopup="menu"
      aria-expanded="false"
      data-state="closed"
      class="flex cursor-default select-none items-center py-1.5 text-sm font-medium outline-none focus:text-accent-foreground data-[state=open]:text-accent-foreground relative z-10 px-2 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent [&amp;[aria-expanded='true']]:after:absolute [&amp;[aria-expanded='true']]:after:inset-x-0 [&amp;[aria-expanded='true']]:after:bottom-[-8px] [&amp;[aria-expanded='true']]:after:block [&amp;[aria-expanded='true']]:after:w-[50px] [&amp;[aria-expanded='true']]:after:border-b-0 sm:[&amp;[aria-expanded='true']]:after:bottom-[-4px] rounded-[2px] [&amp;[aria-expanded='false']]:text-white [&amp;[aria-expanded='true']]:bg-omantel-grey [&amp;[aria-expanded='true']]:text-white"
      data-testid="handleMiniCartToggle"
      tabindex={-1}
      data-orientation="horizontal"
      data-radix-collection-item=""
    >
      <div id="cartIcon" class="relative w-10 h-10 mr-1">
        <Icon
          id="shopping-cart"
          alt="Cart"
          size={24}
          class="w-full h-full text-white"
        />
        <p
          id="cartCount"
          class="absolute p-0.5 tracking-tighter top-[4px] end-[-8px] bg-omantel-electric-green h-[25px] w-[25px] rounded-full font-semibold text-sm text-black"
        >
          0
        </p>
      </div>
    </button>
  );
}
