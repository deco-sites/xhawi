import { useScript } from "@deco/deco/hooks";
import {
  MINICART_BUTTON_ID,
  MINICART_COUNTER_ID,
  MINICART_POPUP_ID,
} from "../../constants.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  dir: "ltr" | "rtl";
}

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;
    if (!counter) {
      return;
    }

    counter.innerText = count > 9 ? "9+" : count.toString();
  });

export default function MinicartButton(props: Props) {
  const { dir } = props;

  return (
    <>
      <button
        id={MINICART_BUTTON_ID}
        data-controller={MINICART_POPUP_ID}
        type="button"
        role="menuitem"
        aria-haspopup="menu"
        aria-expanded="false"
        data-state="closed"
        class="flex cursor-default select-none items-center py-1.5 text-sm font-medium outline-none focus:text-accent-foreground data-[state=open]:text-accent-foreground relative z-10 px-2 hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent [&amp;[aria-expanded='true']]:after:absolute [&amp;[aria-expanded='true']]:after:inset-x-0 [&amp;[aria-expanded='true']]:after:bottom-[-8px] [&amp;[aria-expanded='true']]:after:block [&amp;[aria-expanded='true']]:after:w-[50px] [&amp;[aria-expanded='true']]:after:border-b-0 sm:[&amp;[aria-expanded='true']]:after:bottom-[-4px] rounded-[2px] [&amp;[aria-expanded='false']]:text-white [&amp;[aria-expanded='true']]:bg-omantel-grey [&amp;[aria-expanded='true']]:text-white"
        tabindex={-1}
        dir={dir}
      >
        <div id="cartIcon" class="relative w-10 h-10 mr-1">
          <Icon
            id="shopping-cart"
            alt="Cart"
            size={24}
            class="w-full h-full text-white"
          />
          <p
            id={MINICART_COUNTER_ID}
            class="absolute p-0.5 tracking-tighter top-[4px] end-[-8px] rtl:end-6 bg-omantel-electric-green size-[25px] rounded-full font-semibold text-sm text-black"
          >
            <span class="border-b border-black rounded-full size-2 animate-spin" />
          </p>
        </div>
      </button>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_COUNTER_ID),
        }}
      />
    </>
  );
}
