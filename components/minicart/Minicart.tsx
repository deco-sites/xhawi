import { useScript } from "@deco/deco/hooks";
import { AppContext } from "../../apps/site.ts";
import { MINICART_FORM_ID, MINICART_POPUP_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useI18n } from "../../sdk/i18n.ts";
import { useComponent } from "../../sections/Component.tsx";
import Icon from "../ui/Icon.tsx";
import Popup from "../ui/Popup.tsx";
import Empty from "./Empty.tsx";
import CartItem, { Item } from "./Item.tsx";

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

const _sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};

export const action = async (props: Props, req: Request, ctx: AppContext) => {
  const form = await req.clone().formData();
  const state = form.get("state");

  if (req.method === "PATCH") {
    return {
      ...props,
      state,
      minicart: await ctx.invoke("site/loaders/minicart.ts"),
    };
  }

  return {
    ...props,
    state,
    minicart: await ctx.invoke("site/actions/minicart/submit.ts"),
  };
};

export function ErrorFallback() {
  return (
    <>
      <Popup.Backdrop controlledBy={MINICART_POPUP_ID} />
      <div
        dir="auto"
        data-state="closed"
        id={MINICART_FORM_ID}
        data-controlled-by={MINICART_POPUP_ID}
        data-before-open={useScript(
          (dir: "ltr" | "rtl", id: string) => {
            const button = document.getElementById("minicart-button");
            const container = document.getElementById(id);
            if (!button || !container) return;

            setTimeout(() => {
              const bounds = button.getBoundingClientRect();
              const containerBounds = container.getBoundingClientRect();
              const left = dir === "ltr"
                ? bounds.left + bounds.width - containerBounds.width
                : bounds.left;
              container.style.transform = `translateX(${left}px) translateY(${
                bounds.bottom + 12
              }px)`;
            }, 0);
          },
          "ltr",
          MINICART_POPUP_ID,
        )}
        class="data-[state=closed]:hidden fixed left-0 top-0 min-w-max will-change-transform z-[100]"
      >
        <Popup
          controlledBy={MINICART_POPUP_ID}
          role="menu"
          aria-orientation="vertical"
          dir="auto"
          class={clx(
            "min-w-[12rem] overflow-hidden border bg-popover text-popover-foreground shadow-md slide-in-from-top-2 gap-4 !rounded-t-none max-w-xs lg:max-w-[432px] p-2 lg:min-w-[318px] lg:p-0 rounded-sm z-[100]",
            "data-[state=closed]:hidden",
            "data-[state=open]:fade-in-0",
            "data-[state=open]:zoom-in-95",
            "data-[state=open]:animate-in",
          )}
        >
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
              type="button"
              class="btn btn-primary"
              hx-patch={useComponent(import.meta.url)}
              hx-swap="outerHTML"
              hx-target="closest div"
            >
              Retry
            </button>
          </div>
        </Popup>
      </div>
    </>
  );
}

interface Props {
  labels: {
    minicart: {
      empty: {
        title: string;
        description: {
          line1: string;
          line2: string;
        };
        button: string;
      };
    };
  };
  dir: "ltr" | "rtl";
  currentUrl: string;
  minicart: Minicart;
  state?: "open" | "closed";
}

export default function Cart(props: Props) {
  const { translations } = useI18n(props);
  const { labels, dir, currentUrl, minicart } = props;
  const { storefront, platformCart } = minicart;
  const { items, total, coupon, currency } = storefront;
  const state = props.state ?? "closed";

  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Popup.Backdrop controlledBy={MINICART_POPUP_ID} state={state} />
      <form
        id={MINICART_FORM_ID}
        dir={dir}
        data-state={state}
        data-controlled-by={MINICART_POPUP_ID}
        data-on-update-state={useScript((id: string) => {
          const form = document.getElementById(id) as HTMLFormElement;
          const state = form.getAttribute("data-state");
          if (state) {
            const input = form.querySelector<HTMLInputElement>(
              `input[name="state"]`,
            );
            if (input) {
              input.value = state;
            }
          }
        }, MINICART_FORM_ID)}
        data-before-open={useScript(
          (dir: "ltr" | "rtl", id: string) => {
            const button = document.getElementById("minicart-button");
            const container = document.getElementById(id);
            if (!button || !container) return;

            setTimeout(() => {
              const bounds = button.getBoundingClientRect();
              const containerBounds = container.getBoundingClientRect();
              const left = dir === "ltr"
                ? bounds.left + bounds.width - containerBounds.width
                : bounds.left;
              container.style.transform = `translateX(${left}px) translateY(${
                bounds.bottom + 12
              }px)`;
            }, 0);
          },
          dir,
          MINICART_FORM_ID,
        )}
        class="data-[state=closed]:hidden fixed left-0 top-0 min-w-max will-change-transform z-[100]"
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="this"
        hx-indicator="this"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url, {
          labels,
          dir,
          currentUrl,
        })}
        hx-swap="innerHTML"
        hx-select={`#${MINICART_FORM_ID}>*`}
      >
        <input hidden name="state" value={state} />
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button hidden name="action" value="add-to-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(
            JSON.stringify({ coupon, currency, value: total, items }),
          )}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />
        <Popup
          state={state}
          controlledBy={MINICART_POPUP_ID}
          role="menu"
          aria-orientation="vertical"
          dir={dir}
          class={clx(
            "min-w-[12rem] overflow-hidden border bg-popover text-popover-foreground shadow-md slide-in-from-top-2 gap-4 !rounded-t-none max-w-xs lg:max-w-[432px] p-2 lg:min-w-[318px] lg:p-0 rounded-sm z-[100]",
            "data-[state=closed]:hidden",
            "data-[state=open]:fade-in-0",
            "data-[state=open]:zoom-in-95",
            "data-[state=open]:animate-in",
          )}
        >
          <div>
            {count <= 0
              ? (
                <Empty
                  title={labels.minicart.empty.title}
                  line1={labels.minicart.empty.description.line1}
                  line2={labels.minicart.empty.description.line2}
                  button={labels.minicart.empty.button}
                  currentUrl={currentUrl}
                />
              )
              : (
                <>
                  <div id="miniCart">
                    <div class="flex items-start justify-between pt-[20px] px-[24px] w-[432px]">
                      <div class="minicart-popup-my-cart-heading text-base font-medium ">
                        My Cart ({count})
                      </div>
                      <button
                        type="button"
                        data-controller={MINICART_POPUP_ID}
                        class="h-4 w-4 cursor-pointer"
                        aria-label="Close"
                      >
                        <Icon
                          id="close-small"
                          size={20}
                          class="h-full w-full"
                        />
                      </button>
                    </div>
                    <div class="max-h-[250px] overflow-y-auto min-h-[160px] relative px-5">
                      <div>
                        {items.map((item, index) => (
                          <CartItem
                            item={item}
                            index={index}
                            currency={currency}
                            labels={{
                              priceInclusiveOfVAT:
                                translations.product.priceInclusiveOfVAT,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div class="flex justify-between px-6 pt-4 bg-omantel-smoke ">
                      <div
                        class="text-[#656565]&quot; text-base font-medium "
                        id="subtotal"
                      >
                        Subtotal
                      </div>
                      <div class="" id="price">
                        <div class="product-price text-base font-bold flex justify-end">
                          <span>OMR</span>
                          <span>
                            <span class="pl-1">{formatPrice(total)}</span>
                          </span>
                        </div>
                        <div class="minicart-price-vat-inclusive text-xs text-omantel-font-grey">
                          {translations.product.priceInclusiveOfVAT}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="p-4 bg-omantel-smoke">
                    <button
                      type="button"
                      class="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 p-6 bg-omantel-electric-green font-Rubik text-sm text-black hover:bg-omantel-dark-green active:bg-omantel-dark-green focus:bg-omantel-dark-green active:border-2 active:border-omantel-dark-green focus:ring-2 active:ring-omantel-dark-green focus:ring-omantel-dark-green disabled:bg-omantel-platinum disabled:text-omantel-grey w-full"
                      id="gotoCart"
                    >
                      <Icon
                        id="cart-button"
                        size={24}
                        class="mr-4"
                      />Go to Cart
                    </button>
                  </div>
                </>
              )}
          </div>
        </Popup>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(onLoad, MINICART_FORM_ID),
          }}
        />
      </form>
    </>
  );
}
