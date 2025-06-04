import { useScript } from "@deco/deco/hooks";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";
import Icon from "../ui/Icon.tsx";

export type Item = AnalyticsItem & {
  listPrice: number;
  image: string;
};
export interface Props {
  item: Item;
  index: number;
  locale?: string;
  currency: string;
  labels: {
    priceInclusiveOfVAT: string;
  };
}

const QUANTITY_MAX_VALUE = 100;

const removeItemHandler = (itemId: string) => {
  window.STOREFRONT.CART.setQuantity(itemId, 0);
};

function CartItem({ item, labels, index }: Props) {
  const { image, price = Infinity, quantity } = item;
  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;
  // deno-lint-ignore no-explicit-any
  const itemId = (item as any).item_id;

  return (
    <div id={itemId} class="border-color-[#D2D2D2] w-full border-b py-4">
      <input
        type="number"
        value={quantity}
        class="hidden"
        name={`item::${index}`}
      />
      <div class="flex">
        <div class="product-image pt-3 mr-2 flex-[0_0_15%] lg:flex-initial ">
          <img
            alt={name}
            loading="lazy"
            width="60"
            height="60"
            decoding="async"
            src={image}
          />
        </div>
        <div class="w-80">
          <div class="mb-2 flex justify-between ">
            <div class="product-name max-w-48 text-[14px] font-medium leading-5">
              {name}
            </div>
            <div class="product-price lg:min-w-[120px]">
              <div class="flex flex-col items-center text-right lg:block ">
                <div class="cart-product-price mr-3 flex justify-start font-bold items-center">
                  <span class="omr-text text-sm">
                    OMR
                  </span>
                  <span class="cart-price pl-1 text-base font-bold lg:text-xl">
                    {formatPrice(price)}
                  </span>
                </div>
              </div>
              <div class="cart-price-vat-inclusive text-xs text-omantel-font-grey">
                {labels.priceInclusiveOfVAT}
              </div>
            </div>
          </div>
          <div class="flex h-[26px] justify-end gap-[20px] ">
            <div class="quantity-dropdown">
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:r15:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                class="flex items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-background data-[placeholder]:opacity-50 focus:outline-none focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 data-[placeholder]:lg:text-sm h-[26px] w-[56px] border-none bg-omantel-smoke"
              >
                <span style="pointer-events: none;">
                  {quantity}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-down h-4 w-4 text-black opacity-100"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </div>
            <button
              type="button"
              class="item-center flex justify-center ml-2"
              hx-on:click={useScript(removeItemHandler, itemId)}
            >
              <Icon
                id="delete"
                size={24}
                class="delete cursor-pointer mr-0"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
