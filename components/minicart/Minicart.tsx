import { AppContext } from "../../apps/site.ts";
import { MINICART_POPUP_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { useComponent } from "../../sections/Component.tsx";
import Popup from "../ui/Popup.tsx";
import { Item } from "./Item.tsx";
export interface Minicart {
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    locale: string;
    currency: string;
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}

const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;
  window.STOREFRONT.CART.dispatch(form);
  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }
  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send", // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }
      // Disable addToCart button interactivity
      document.querySelectorAll("div[data-cart-item]").forEach((container) => {
        container?.querySelectorAll("button")
          .forEach((node) => node.disabled = true);
        container?.querySelectorAll("input")
          .forEach((node) => node.disabled = true);
      });
    },
  );
};

const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};

export const action = async (_props: unknown, req: Request, ctx: AppContext) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });

export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Error while updating cart
        </span>
        <span class="text-sm text-center">
          Click in the button below to retry or refresh the page
        </span>
      </div>

      <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button>
    </div>
  );
}

export default function Cart(props: { cart: Minicart }) {
  return (
    <>
      <Popup.Backdrop controlledBy={MINICART_POPUP_ID} />
      <div
        dir="ltr"
        data-state="closed"
        data-controlled-by={MINICART_POPUP_ID}
        class="data-[state=closed]:hidden fixed left-0 top-0 min-w-max will-change-transform z-[100] translate-x-[154.667px] translate-y-[62px]"
      >
        <Popup
          controlledBy={MINICART_POPUP_ID}
          role="menu"
          aria-orientation="vertical"
          dir="ltr"
          class={clx(
            "min-w-[12rem] overflow-hidden border bg-popover text-popover-foreground shadow-md slide-in-from-top-2 mr-[43px] lg:mt-[12px] gap-4 !rounded-t-none max-w-xs lg:max-w-[432px] p-2 lg:min-w-[318px] lg:p-0 rounded-sm z-[100]",
            "data-[state=closed]:hidden",
            "data-[state=open]:fade-in-0",
            "data-[state=open]:zoom-in-95",
            "data-[state=open]:animate-in",
          )}
        >
          <div class="">
            <div class="p-4">
              <div class="text-center text-lg font-bold" id="cartStatus">
                Your cart is empty
              </div>
              <div class="py-2 text-center text-sm" id="cartMessage">
                Looks like you haven't made<br />your choice yet.
              </div>
              <div class="p-4">
                <a
                  href="/en"
                  class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey w-full"
                  id="startShopping"
                  data-testid="startShopping"
                >
                  Start Shopping
                </a>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </>
  );
}
